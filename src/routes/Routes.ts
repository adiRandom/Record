const Routes = {
    HOME:"/",
    ACTIVITY:(id:string)=>`/activity/${id}`,
    ACTIVITY_HISTORY:(id:string)=>`/activity/${id}/history`,
    ADD_ACTIVITY:"/add/activity",
    ADD_RECORD:"/add/record"
}

export default Routes;