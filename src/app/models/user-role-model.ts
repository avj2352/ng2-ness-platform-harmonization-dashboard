export interface UserRoleModel {
    id:number;
    code:string;
    name:string;
    screens:string[];
    // pariticipantList:{[key:number]:number}; //This is how typescript Map is defined
}//end:interface-LoginResponseModel