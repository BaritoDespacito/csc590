from time import sleep

print('story story story')
print('enter 1 to go down the hill')
print('enter 2 to go in the buildling')
res = input('input now') # this takes in the user's input
while res != '1' and res != '2': # use a while loop to force them to input again until they get the input right, checks if the input is not a 1 and is not a 2
    print('thats not an option input again')
    res = input() # takes the input again, then loop back to the check
if res == '1': # since you got past the while loop, you know its either 1 or 2, so check if its 1
    print('you chose to go down the hill')
    print('sotry story story')
else: # since you got past the while loop and the check for 1, you know its 2 so u just else statement and move on
    print('you chose to go in the biulding')
    print('story story story')


# so here's example with two checks nested inside each other, and sleep func to give delays
print('story')
sleep(1) # wait 1 second before next thingy
print('more story')
sleep(2)
print('uh oh decision do u wanna go down the bridge or the tunnel')
res = input('enter 1 to go bridge enter 2 to go tunnel')
while res != '1' and res != '2':
    print('thats not a valid input')
    res = input('try again, enter 1 to go bridge enter 2 to go tunnel')
if res == '1':
    print('you chose to go bridge')
    print('story story')
    sleep(2)
    print('more story')
    sleep(1)
    print('uh oh even more decisions do u wanna use the shotgun or the pistol')
    # then literally put the same while loop then if/else statement but with different variable name and different text uk
    res1 = input('enter a 1 to use shotgun enter 2 to use pistol') # you can technically use the variable res again cause the original one does not matter anymore, but i use res1 just in case
    while res1 != '1' and res1 != '2':
        print('thats not a valid input')
        res = input('try again, enter 1 to use shotgun enter 2 to use pistol')
    if res == '1':
        print('you chose to use shotgun')
        sleep(1)
        print('bam boom you win hooray')
    else:
        print('you chose to use pistol')
        sleep(1)
        print('uh oh weak gun u die')
else:
    print('you chose to go tunnel')
    sleep(1)
    print('uh oh tunnel collapsed u die')