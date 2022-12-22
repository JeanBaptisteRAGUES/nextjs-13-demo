"use client"

/* fetchLichess(['e2e4', 'e7e5', 'g1f3', 'b8c6', 'f1b5']); */
import { useEffect, useState } from "react";
import getOpponentMove from "../../lib/fetchLichess";
import testFetchServer from "../../lib/fetchTest";
import Case from "../Case";
import { useQuery, gql } from "@apollo/client";

const QUERY = gql`
    query {
        getUser {
            id
        }
    }
`;

type Move = {
    uci: string,
    san: string,
    opening: string,
    score: {
        white: number,
        draws: number,
        black: number
    }
}

function OpeningsTrainer() {
    const [moves, setMoves] = useState([]);
    const [playerMove, setPlayerMove] = useState("");
    /* const [playerTurn, setPlayerTurn] = useState(false); */
    const [computerMove, setComputerMove] = useState("");
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const startPosition = [
        22,23,24,25,26,24,23,22,
        21,21,21,21,21,21,21,21,
        0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,
        11,11,11,11,11,11,11,11,
        12,13,14,15,16,14,13,12
    ];
    const [board, setBoard] = useState(startPosition);
    const [openingName, setOpeningName] = useState("");
    const [score, setScore] = useState({
        white: 33,
        draws: 34,
        black: 33
    })
    const { data, loading, error } = useQuery(QUERY);

    if (error) {
        console.error(error);
        return null;
    }

    if(!loading){
        console.log(data.getUser.id);
    }

    const userData = !loading && (
        <h2 className=" text-lg font-semibold" >{data.getUser.id}</h2>
    )

    const getScore = (move: Move) => {
        const total = move.score.white + move.score.draws + move.score.black;
        return {
            white: Math.round((move.score.white/total)*100),
            draws: Math.round((move.score.draws/total)*100),
            black: Math.round((move.score.black/total)*100),
        }
    }

    const updateBoard = (oldBoard: Array<number>, newMove: string) => {
        switch (newMove) {
            case "e1h1":
                if(oldBoard[60] === 16){
                    // Castle Short White
                    oldBoard[60] = 0;
                    oldBoard[61] = 12;
                    oldBoard[62] = 16;
                    oldBoard[63] = 0;

                    return oldBoard;
                }
            case "e1a1":
                if(oldBoard[60] === 16){
                    // Castle Long White
                    oldBoard[60] = 0;
                    oldBoard[59] = 12;
                    oldBoard[58] = 16;
                    oldBoard[56] = 0;

                    return oldBoard;
                }
            case "e8h8":
                if(oldBoard[4] === 26){
                    // Castle Short Black
                    oldBoard[4] = 0;
                    oldBoard[5] = 22;
                    oldBoard[6] = 26;
                    oldBoard[7] = 0;

                    return oldBoard;
                }
            case "e8a8":
                if(oldBoard[4] === 26){
                    // Castle Short Black
                    oldBoard[4] = 0;
                    oldBoard[3] = 22;
                    oldBoard[2] = 26;
                    oldBoard[0] = 0;

                    return oldBoard;
                }
            default:
                const moveStart = findIndex(newMove.slice(0,2));
                const moveEnd = findIndex(newMove.slice(2));
                oldBoard[moveEnd] = oldBoard[moveStart];
                oldBoard[moveStart] = 0;
                return oldBoard;
        }
    }

    const play = async () => {
        let newMoves = JSON.parse(JSON.stringify(moves));
        let newBoard = JSON.parse(JSON.stringify(board));
        newMoves.push(playerMove);
        let cMove = {san: "", uci: "", opening: "", score: { white: 50, draws: 0, black: 0 }};
        console.log(newMoves);
        if(playerMove === ""){
            cMove = await getOpponentMove([""]);
        } else {
            cMove = await getOpponentMove(newMoves);
            newBoard = updateBoard(newBoard, playerMove);
        }
        console.log(cMove);
        updateBoard(newBoard, cMove.uci);
        newMoves.push(cMove.uci);
        setComputerMove(cMove.san);
        setMoves(newMoves);
        setPlayerMove("");
        setBoard(newBoard);
        setOpeningName(cMove.opening);
        setScore(getScore(cMove));
    }

    const findNotation = (index: number): string => {
        return letters[Math.floor(index%8)] + (Math.ceil((64-index)/8)).toString();
    }

    const findIndex = (notation: string): number => {
        return (8-parseInt(notation.split('')[1]))*8  + letters.findIndex( (letter) => letter === notation.split('')[0])
    }

    const returnIndex = (index: number): void => {
        setPlayerMove(playerMove + findNotation(index));
    }

    return (
        <div className=" flex flex-col items-center justify-center bg-slate-600 w-full h-[700px]" >
            <h1 className=" text-xl font-bold">{openingName}</h1>
            <div className=" flex flex-row justify-center items-center w-80 h-10 border rounded overflow-hidden" >
                {
                    score.white >= 10 ?
                        <div className="h-full bg-white flex justify-center items-center" style={{ width: `${score.white}%` }} >{score.white}%</div>
                    :
                        <div className="h-full bg-white flex justify-center items-center" style={{ width: `${score.white}%` }} ></div>

                }
                {
                    score.draws >= 10 ?
                        <div className="h-full bg-slate-500 flex justify-center items-center" style={{ width: `${score.draws}%` }} >{score.draws}%</div>
                    :
                        <div className="h-full bg-slate-500 flex justify-center items-center" style={{ width: `${score.draws}%` }} ></div>
                }
                {
                    score.black >= 10 ?
                        <div className="h-full bg-black text-white flex justify-center items-center" style={{ width: `${score.black}%` }} >{score.black}%</div>
                    :
                        <div className="h-full bg-black text-white flex justify-center items-center" style={{ width: `${score.black}%` }} ></div>
                }
                
            </div>
            <button onClick={() => testFetchServer()} className=" underline text-cyan-300" >Fetch http://localhost:3000/api/hello</button>
            <h2 className=" text-lg font-bold" >L'adversaire a joué : {computerMove}</h2>
            {userData}
            <p>Coups joués : {moves.map((move: string) => move + " ")}</p>
            <input type="text" value={playerMove} onChange={(e) => setPlayerMove(e.target.value)} placeholder="ex: e2e4" />
            <button onClick={() => play()} >Jouer</button>
            <div className=" grid grid-cols-8 grid-rows-[8] grid-flow-row items-stretch border border-black w-80 h-80" >
                {
                    board.map((c, i: number) => (
                        <Case key={i} index={i} col={letters[Math.floor((i)%8)]} row={Math.ceil((64-i)/8)} returnIndex={returnIndex} piece={c} />
                    ) )
                }
            </div>
        </div>
    )
}

export default OpeningsTrainer;