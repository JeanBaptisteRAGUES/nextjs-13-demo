function randomIntFromInterval(min: number, max: number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

type Move = {
    uci: string,
    san: string
}

// https://explorer.lichess.ovh/lichess?variant=standard&fen=rnbqkbnr%2Fpppppppp%2F8%2F8%2F8%2F8%2FPPPPPPPP%2FRNBQKBNR+w+KQkq+-+0+1&play=e2e4%2Ce7e5%2Cg1f3&since=2012-01&until=2022-12&speeds=bullet%2Cblitz%2Crapid%2Cclassical&ratings=1600%2C1800%2C2000

export default async function getOpponentMove(moves: Array<String>) {
    console.log("Moves : ", moves);
    const movesFormated = moves.filter(m => m !== "").join("%2C");
    console.log("Moves formated : ", movesFormated);
    const res = await fetch(`https://explorer.lichess.ovh/lichess?variant=standard&fen=rnbqkbnr%2Fpppppppp%2F8%2F8%2F8%2F8%2FPPPPPPPP%2FRNBQKBNR+w+KQkq+-+0+1&play=${movesFormated}&since=2012-01&until=2022-12&speeds=bullet%2Cblitz%2Crapid%2Cclassical&ratings=1600%2C1800%2C2000`
    );

    const data = await res.json();

    const gamesTotal = data.white + data.draws + data.black;
    let randMove = randomIntFromInterval(0, gamesTotal);
    let moveIndex = -1;

    /* data.moves.map((move: any, i: number, acc: number) => {
        acc = 
        if(moveIndex < 0 && randMove <= acc) moveIndex = i;
        console.log("acc : %d | i : %d", acc, i);
    }); */

    /* let gamesArray = data.moves.reduce((acc: number, curr: any) => acc + (curr.white + curr.draws + curr.black), 0); */
    let gamesArray: any[] = [];

    data.moves.map((move: any, i: number, array: Array<any>) => {
        gamesArray.push(array.slice(0,i+1).reduce((acc: number, curr: any) => acc + curr.white + curr.draws + curr.black, 0));
    });

    moveIndex = gamesArray.length - gamesArray.filter(value => value > randMove).length;

    /* console.log("Total de parties : ", gamesTotal);
    console.log("Partie choisie : ", randMove);
    console.log("Tableau des parties : ", gamesArray);
    console.log("Index du coup choisi : ", moveIndex); */
    console.log("Coup choisi : %s (%s)", data.moves[moveIndex].san,  data.moves[moveIndex].uci);

    return {
        san: data.moves[moveIndex].san,
        uci: data.moves[moveIndex].uci,
        opening: data.opening ? data.opening.name : "",
        score: {
            white: data.moves[moveIndex].white,
            draws: data.moves[moveIndex].draws,
            black: data.moves[moveIndex].black
        }
    }
}

/* export default getOpponentMove; */
