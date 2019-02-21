
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
        //랜덤으로 생성될 팀리스트
        let randomTeam:Array<any> = [];
        //랜덤으로 생성된 팀의 스코어 합계
        let sumList:Array<number> = [];
        //전체 멤버
        let memberList = this.memberList;
        //한 사이클동안 해당팀이 선택됬는지 파학하기 위해 사용
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
                //들어갈 팀 ex)1팀,2팀,3팀
                team = Math.floor(Math.random()*teamCount);
            //
            }while(selectedTeam.indexOf(team)!==-1);
            randomTeam[team] = randomTeam[team] || [];
            randomTeam[team].push(man);
            let sumVal = sumList[team];
            sumList[team] = sumVal ? sumVal+man.score : 0+man.score;
            selectedTeam.push(team);
            if(selectedTeam.length-teamCount===0){
                //한사이클 종료하여 리셋
                selectedTeam = [];
            }
        }

        randomTeam.map((item,index)=>{
            randomTeam[index].push({name:'합계',score:sumList[index]});
        });
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