import React, { useRef, useState } from 'react'
import './TicTacToe.css'
import circle_icon from "../assets/circle.png"
import cross_icon from "../assets/cross.png"


let data = Array(9).fill("");

export const TicTacToe = () => {
    let [count, setCount] = useState('x');
    let [lock, setLock] = useState(false);
    let titleRef = useRef(null);


    const control = (e, num) => {
        if (lock || e.target.innerHTML !== '') return;

        const sign = count === 'x' ? cross_icon : circle_icon;
        e.target.innerHTML = `<img src="${sign}" />`;
        data[num] = count;
        scoreless()
        checkWin(sign);
        setCount(count === 'x' ? 'o' : 'x');
    }

    const checkWin = (sign) => {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const condition of winConditions) {
            if (data[condition[0]] === data[condition[1]] && data[condition[1]] === data[condition[2]] && data[condition[2]] === count) {
                titleRef.current.innerHTML = `Congratulations <img src="${sign}" /> Won!`;
                setLock(true);
                break;
            }
        }
    }

    const scoreless = () => {
        let say = 0;
        data.forEach(a => {
            if (a !== "") {
                say++
            }
            if (say == 9) {
                titleRef.current.innerHTML = `A <span>Draw</span>`;
                setLock(true)
            }
        })
    }

    const reset = () => {
        data = Array(9).fill("");
        setLock(false);
        titleRef.current.innerHTML = "Tic Tac Toe In <span>React</span>";
        const boxElements = document.querySelectorAll('.box');
        boxElements.forEach((box) => {
            box.innerHTML = "";
        });
    }

    return (
        <div className='container'>
            <h1 className='title' ref={titleRef}>Tic Tac Toe In <span>React</span></h1>
            <div className="board">
                <div className="row">
                    <div className="box" onClick={(e) => { control(e, 0) }}></div>
                    <div className="box" onClick={(e) => { control(e, 1) }}></div>
                    <div className="box" onClick={(e) => { control(e, 2) }}></div>
                </div>
                <div className="row">
                    <div className="box" onClick={(e) => { control(e, 3) }}></div>
                    <div className="box" onClick={(e) => { control(e, 4) }}></div>
                    <div className="box" onClick={(e) => { control(e, 5) }}></div>
                </div>
                <div className="row">
                    <div className="box" onClick={(e) => { control(e, 6) }}></div>
                    <div className="box" onClick={(e) => { control(e, 7) }}></div>
                    <div className="box" onClick={(e) => { control(e, 8) }}></div>
                </div>
            </div>
            <button className='reset' onClick={() => { reset() }}>Reset</button>
        </div>
    )
}
