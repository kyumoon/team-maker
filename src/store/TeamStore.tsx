
import {action, observable} from "mobx";

export interface Member{
    name:string,
    score:number
}

export interface Team{
    
}

export class TeamStore{
    @observable memberList:Array<Member>=[];
    @observable teamList:Array<Team>=[];
    @observable isTeamMaken:boolean = false;

    @action
    addMember = (member:Member)=>{
        this.memberList.push(member);
        this.sortMemebers(this.memberList);
    }

    @action
    removeMember = (key:number)=>{
        this.memberList.splice(key,1);
        this.sortMemebers(this.memberList);
    }

    @action
    sortMemebers(memberList:Array<any>){
        this.memberList = memberList.slice().sort(
            function(a,b){
            return b.score - a.score;
            }
        );
    }

    @action
    makeTeam = (teamCount:number)=>{
        let randomTeam:Array<any> = [];
        let memberList = this.memberList;
        let selectedTeam:Array<number> = [];
        let team = 0;
        if(memberList.length < teamCount){
            alert('팀생성을 위한 인원이 부족합니다.');
            return;
        }
        this.isTeamMaken = !this.isTeamMaken;
        for(let i=0; i<memberList.length; i++){
            let man = memberList[i];
            do{
                team = Math.floor(Math.random()*teamCount);
            }while(selectedTeam.indexOf(team)!==-1);
            randomTeam[team] = randomTeam[team] || [];
            randomTeam[team].push(man);
            selectedTeam.push(team);
            if(selectedTeam.length-teamCount===0){
                selectedTeam = [];
            }
        }
        this.teamList = randomTeam;
    }

    @action
    initValue = ()=>{
        this.memberList = [];
        this.teamList = [];
        this.isTeamMaken = false;
    }
}

const teamStore = new TeamStore();

export default teamStore;