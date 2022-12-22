import React from 'react';
import { FaChessPawn, FaChessRook, FaChessKnight, FaChessBishop, FaChessQueen, FaChessKing } from 'react-icons/fa';

type Props = {
    index: number,
    col: string,
    row: number,
    piece: number,
    returnIndex: (notation: number) => void
};

const pieceDisplay = (piece: number) => {
    switch (piece) {
        case 11:
            return <FaChessPawn className=' absolute text-red-700  w-7 h-7' />
        case 12:
            return <FaChessRook className=' absolute text-red-700 w-7 h-7' />
        case 13:
            return <FaChessKnight className=' absolute text-red-700 w-7 h-7' />
        case 14:
            return <FaChessBishop className=' absolute text-red-700 w-7 h-7' />
        case 15:
            return <FaChessQueen className=' absolute text-red-700 w-7 h-7' />
        case 16:
            return <FaChessKing className=' absolute text-red-700 w-7 h-7' />
        case 21:
            return <FaChessPawn className=' absolute text-black w-7 h-7' />
        case 22:
            return <FaChessRook className=' absolute text-black w-7 h-7' />
        case 23:
            return <FaChessKnight className=' absolute text-black w-7 h-7' />
        case 24:
            return <FaChessBishop className=' absolute text-black w-7 h-7' />
        case 25:
            return <FaChessQueen className=' absolute text-black w-7 h-7' />
        case 26:
            return <FaChessKing className=' absolute text-black w-7 h-7' />
    
        default:
            break;
    }
}

function Case({index, col, row, piece, returnIndex}: Props) {

    if((index+row) % 2 === 0){
        return <div onClick={() => returnIndex(index)} className="flex justify-center items-center bg-white cursor-pointer" >{pieceDisplay(piece)}</div>
    }

    return <div onClick={() => returnIndex(index)} className="flex justify-center items-center bg-green-700 cursor-pointer" >{pieceDisplay(piece)}</div>
}

/* function Case({index, col, row, piece, returnIndex}: Props) {

    if((index+row) % 2 === 0){
        return <div onClick={() => returnIndex(index)} className="flex justify-center items-center bg-white cursor-pointer" >{index}</div>
    }

    return <div onClick={() => returnIndex(index)} className="flex justify-center items-center bg-green-700" >{index}</div>
} */

export default Case;