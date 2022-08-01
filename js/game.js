'use strict'

var gSize
var gameOn
var gCurrNum
var gTimer
var gTimerId
var gWrongId
var elWrong = document.querySelector('.wrong')
var elWin = document.querySelector('.win')

function init(size) {
    resetGame()
    createBoard(size)
    gSize = size
    gameOn = true
}

function resetGame() {
    gCurrNum = 1
    elWrong.style.display = 'none'
    elWin.style.display = 'none'
    if (gTimerId) clearInterval(gTimerId)
    gTimer = 0
    var elTimer = document.querySelector('.timer')
    elTimer.innerHTML = 'Timer: ' + gTimer.toFixed(3)
    var elNum = document.querySelector('.nextNum')
    elNum.innerHTML = 'Next number: ' + gCurrNum
}

function createBoard(length) {
    var nums = getNums(length)

    var strHTML = '<tbody>'
    for (var i = 0; i < length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < length; j++) {
            var idx = getRandomInt(0, nums.length)
            var num = nums[idx]
            strHTML += `<td onclick="checkClick(this)">${num}</td>`
            nums.splice(idx, 1)
        }
        strHTML += '</tr>'
    }
    strHTML += '</body>'
    var elBoard = document.querySelector('table')
    elBoard.innerHTML = strHTML
}

function getNums(length) {
    var nums = []
    for (var i = 0; i < length ** 2; i++) {
        nums[i] = i + 1
    }
    return nums
}

function checkClick(elCell) {
    if (!gameOn) return
    var num = +elCell.innerText

    if (num !== gCurrNum) {
        wrongCell()
        return
    }
    
    if (num === 1) startTimer()

    elWrong.style.display = 'none'
    elCell.style.backgroundColor = 'rgb(110, 195, 145)'
    gCurrNum++
    if (checkWin()) return
    var elNum = document.querySelector('.nextNum')
    elNum.innerHTML = 'Next number: ' + gCurrNum
}

function wrongCell() {
    elWrong.style.display = 'block'
    if (gWrongId) clearTimeout(gWrongId)
    gWrongId = setTimeout(() => {
        elWrong.style.display = 'none'
    }, 2000)
}

function startTimer() {
    gTimerId = setInterval(() => {
        updateTime()
    }, 4)
}

function updateTime() {
    gTimer += 4 * 10 ** -3
    var elTimer = document.querySelector('.timer')
    elTimer.innerHTML = 'Timer: ' + gTimer.toFixed(3)
}

function checkWin() {
    if (gCurrNum > gSize ** 2) {
        gameOn = false
        clearInterval(gTimerId)
        elWrong.style.display = 'none'
        elWin.style.display = 'block'
        return true
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}



