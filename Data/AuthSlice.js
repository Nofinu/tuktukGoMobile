import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
    name:"AuthToken",
    initialState:{
        token:"",
        user : {
            id_user : null ,
            email : "",
            lastname:"",
            firstname:"",
            phone:"",
            role: null
        },
        status:true
    },
    reducers:{
        setToken(state,actions){
            state.token = actions.payload;
        },
        logout(state){
            state.token = "";
            state.user.id_user = null
            state.user.email = ""
            state.user.lastname = ""
            state.user.firstname = ""
            state.user.phone = ""
            state.user.role = null
        },
        setUser(state,actions){
            state.user.id_user = actions.payload.id_user
            state.user.email = actions.payload.email
            state.user.lastname = actions.payload.lastname
            state.user.firstname = actions.payload.firstname
            state.user.phone = actions.payload.phone
            state.user.role = actions.payload.role
        },
        changeStatus(state){
            state.status = !state.status
        }
    }
})


export const {setToken,logout,setUser,changeStatus} = AuthSlice.actions;

export default AuthSlice.reducer;