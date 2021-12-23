import React, { useEffect, useState } from "react";
export default function Quanlydonhang(props){
    const [userlist,setUserlist]= useState([]);
    useEffect(()=>{
        fetch('/oder')
        .then(item=>item.json())
        .then(item=>{
            setUserlist(item);
        })
    },[])
    const xoa=(code)=>{
        setUserlist(userlist.filter(item=>item.code!=code));
    }
    return<div className="background">
    <div className="quanlidonhang">
        <div className="quanlidonhang__head">
                <h3 style={{margin:"20px 630px 0px 20px"}}>Danh sách đơn hàng</h3>
                <p className="them 2" onClick={props.thoat}>Đóng</p>
        </div>
        <div className="quanlidonhang__body">
            {
                userlist.map((item)=>{
                    return<div className="quanlidonhang__body-list" >
                        <p style={{background:"white",padding:"2px 15px 15px 15px",borderRadius:"4px"}}>
                        <h3 style={{borderBottom:"1px solid #ececec",padding:"0px 0px 10px 0px"}}>THÔNG TIN KHÁCH HÀNG</h3>
                        <div>
                        Name:{" "+item.name}<br/>
                        Địa chỉ:{" "+item.address}<br/>
                        SĐT:{" "+item.telephone}<br/>
                        Email:{" "+item.email}<br/>
                        </div>
                        </p>
                         <Order orderlist={item} xoa={xoa}/>
                    </div>
                })
            }
        </div>
    </div>
    </div>
}
function Order(props){
    const [kho,setKho]=useState(props.orderlist);
    useEffect(()=>{
        setKho(props.orderlist);
        console.log(props.orderlist);
    },[props.orderlist])
   const xoaOrder=(u)=>{
       fetch('oder/'+u.target.value,{
           method:"DELETE",
           headers:{
               'Content-Type':'application/json'
           }
       })
       props.xoa(u.target.value);
   }
    return<div >
        
            <div className="quanlidonhang__body-list-order" style={{background:"white",padding:"2px 15px 15px 15px",borderRadius:"4px"}} >
             Mã đơn hàng: <span style={{fontWeight:"500"}}>{kho.code}</span> <br/>
             Thời gian tạo: <span style={{fontWeight:"500"}}>{kho.oder_date} </span><button className="button__dangnhap form__inputform-button2" style={{fontWeight:"bold",color:"#c92127",border:"2px solid #c92127",borderRadius:"6px",height:"30px",width:"150px",marginRight:"-50px",background:"white"}} value={kho.code} onClick={xoaOrder}>Hủy đơn hàng</button><br/>
              Tổng số tiền: <span style={{fontWeight:"500"}}>{kho.cost.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')+" Đồng"}</span><br/>
              <Donhang code={kho.code}/>
              </div>
        
    </div>
}
function Donhang(props){
    const [itemlist,setItemlist]= useState([]);
    useEffect(()=>{
        fetch('/oder')
        .then(item=>item.json())
        .then(item=>{
            return item.filter((item)=>( item.code==props.code))
        })
        .then(item=>{
            setItemlist(item[0].oder);
        })
    },[props.code])
    if(itemlist.length>0){
        return<>
        {itemlist.map((item)=>{
            if(item!=null){
                return <table>
            <tr>
                <td rowSpan="2"><img className="giohang__sach" src={item.image}></img></td>
                <td>Tên:{" "+item.name}</td>
            </tr>
            <tr>
            <td>Giá:{" "+item.price}</td>
            </tr>
            <tr>
            <td>Số lượng:{" "+item.quantity}</td>
            </tr>
            
        </table>
            }
        })}
    </>
    }
    else return null;
    
}