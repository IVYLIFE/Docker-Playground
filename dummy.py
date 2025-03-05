import turtle
import random

pen = turtle.Turtle()
pen.speed(0)
wn = turtle.Screen()
wn.bgcolor("black")
wn.tracer(1000)
pen.goto(200,200)
pen.hideturtle()
colors = ["White","Gray","Blue","Yellow","Red"]
pen.color("White")

for i in range(1000):
    pen.color(random.choice(colors))
    pen.right(i/10 + 90)
    pen.forward(250)
    pen.right(1)
    
print("Title: Concentration")
turtle.done()