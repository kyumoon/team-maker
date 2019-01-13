import * as React from 'react';

function Team(props:any){
    let member = props.team.map((man:any,index:number)=>{
        return <li key={index}>{man.name}/{man.score}</li>
    })
    return (
        <ul className="team">
            <li key={999}>{props.index+1}팀</li>
            {member}
        </ul>
    );
}

export default Team;