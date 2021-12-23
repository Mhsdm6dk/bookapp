import axios from "axios";
import React, {  useState } from "react";
import { useDispatch } from "react-redux";
import {kiemtrauser} from "../../actions";
export default function Dangnhap(props){
        const dispatch=useDispatch();
        const [state,setState]=useState({
            username:"",
            password:""
        });
        const getinfo=(item)=>{
            setState({...state, [item.target.name]:item.target.value});
        }
        const dangnhap=()=>{
            axios.post('/customer/login',{
                username:state.username,
                password:state.password
            })
            .then(
                user=>{
                   
                    if(user.data[0].username=="hanhtshh"){
                        dispatch(kiemtrauser({...user.data[0],admin:"yes"}));
                        
                    }
                    else{
                        dispatch(kiemtrauser({...user.data[0],admin:"no"}));
                       
                    }
                    props.thoatform();
                }
            )
            .catch(user=>{alert('sai thong tin dang nhap hoac mat khau')
            props.thoatform();
        })
           
          }
        const gotodangki=()=>{
            props.display("Đăng kí");
        }
        return <div className="background">
            <div className="form__dangnhap-inputform" id="formdangnhap" >
            <div className="form__inputform">
            <div style={{margin:"0px 0px 20px 10px"}}>
                <div className="form__header">
                <h3 >Đăng nhập</h3>
                <span className="form__header-link" onClick={gotodangki}>Đăng kí</span>
            </div>
            <div className="spaceline">Tên đăng nhập:</div>
            <input type="text" id="tendangnhap" placeholder="Nhập tên đăng nhập" name="username" onChange={getinfo} className="form__inputform-text"></input>
            <div className="spaceline">Mật khẩu:</div>
            <input type="password" id="matkhau" name="password" onChange={getinfo} placeholder="*******" className="form__inputform-text"></input>
            <br/>
            <button className="button__dangnhap form__inputform-button2" onClick={dangnhap}>Đăng nhập</button>
            <br/>
            <button className="button__boqua form__inputform-button" onClick={props.thoatform}>Bỏ qua</button>
            </div>
            </div>
        </div>
        </div>

}