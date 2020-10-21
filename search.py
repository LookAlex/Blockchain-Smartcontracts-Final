import hashlib

# Your code goes here.


for n in range(0,500000):
    x="seed"+"x"*n
    x=bytes(str(x),'ascii')
    h=hashlib.sha256(x).hexdigest()
    if h[0]== 'f' and h[1]== 'f' and h[2]=='f':
        print(n,h)
        break
        
for n in range(1,100000000):
    if n%1000==0:
        print(n)
    s=b"y"*n
    h=hashlib.sha256(s).hexdigest()
    if h[0]=="0" and h[1]=="0" and h[2]:=="0" and h[4]=="0":
        print(n,"is good",h)
        break
    


# Your code should run when you run it from the command line using:
# 
#  python3 search.py
# 
# In particular if you put your code in a function, make sure that you call the function at the top-level of this file!
