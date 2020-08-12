import RPi.GPIO as io

import Adafruit_DHT as dht

import json
import requests
import time

import threading

from multiprocessing import Process, Queue

import signal
import sys

data = [0, 0, 0, 0, 0, 0, 0] #7size


def signal_handler(sig, frame):
    print('프로그램을 종료합니다')
    io.cleanup()
    sys.exit(0)
signal.signal(signal.SIGINT, signal_handler)


def moter():
    global winow_open
    global door_open
    while True:
        # print("MOTER!", winow_open, door_open,data[0],data[1])
        if data[0] == 0: #close
            if winow_open:
                window.ChangeDutyCycle(4.5)
                window1.ChangeDutyCycle(8.5)
                winow_open = False
                time.sleep(1)
        else:
            if not winow_open:
                window.ChangeDutyCycle(10.5)
                window1.ChangeDutyCycle(2.5)
                winow_open = True
                time.sleep(1)

        if data[1] == 0: #close
            if door_open:
                door.ChangeDutyCycle(11)
                door_open = False
                time.sleep(1)
        else:
            if not door_open:
                door.ChangeDutyCycle(2.5)
                door_open = True
                time.sleep(1)

t = 0
h = 0
def request():
    while True:
        try:
            global data
            global t
            global h
            print("리쿼스트",data,t,h)
            res = requests.get(URL + "/api/setData0?data={0}".format([t, h]));
            d = res.json()
            # print("Data : ", d)
            data = d['data']
        except:
            pass


def dht_thread():
    while True:
        # 습도 온도
        global t
        global h
        hum, tem = dht.read_retry(dhtSensor, 23)
        h=hum
        t=tem
        print(tem,hum)

if __name__ == "__main__":


    dhtSensor = dht.DHT11

    # LED OUTPUT Setting
    io.setmode(io.BCM)

    io.setup(1, io.OUT)
    io.setup(7, io.OUT)
    io.setup(8, io.OUT)

    io.output(1, io.LOW)
    io.output(7, io.LOW)
    io.output(8, io.LOW)
    # DTH
    # io.setup(23, io.OUT)

    # DOOR MOTER
    # MIN 2.5
    # MAX 12.5
    io.setup(14, io.OUT)
    door = io.PWM(14, 50)
    door.start(0)

    # WINDOW MOTER
    # io.setup(14, io.OUT)
    io.setup(15, io.OUT)
    window = io.PWM(15, 50)
    window.start(0)

    io.setup(18, io.OUT)
    window1 = io.PWM(18, 50)
    window1.start(0)

    b = True

    # window door led1, 2, 3, 온, 습도
    URL = "http://mbs-b.com:3000"
    res = requests.get(URL+'/api/getData')

    data = res.json()['data']

    winow_open = False
    door_open = False

    window.start(0)
    window1.start(0)
    door.start(0)
    window.ChangeDutyCycle(4.5)
    window1.ChangeDutyCycle(8.5)
    door.ChangeDutyCycle(11)

    time.sleep(1)
    # window.stop()
    # window1.stop()
    # door.stop()


    t1=threading.Thread(target=moter)
    t2=threading.Thread(target=request)
    t3=threading.Thread(target=dht_thread)
    t1.setDaemon(True)
    t2.setDaemon(True)
    t3.setDaemon(True)
    t1.start()
    t2.start()
    t3.start()
    # threading.Thread(target=dht_thread).start()
    while True:
        if data[2] == 0:
            io.output(1, io.LOW)
        else:
            io.output(1, io.HIGH)
        if data[3] == 0:
            io.output(7, io.LOW)
        else:
            io.output(7, io.HIGH)
        if data[4] == 0:
            io.output(8, io.LOW)
        else:
            io.output(8, io.HIGH)

