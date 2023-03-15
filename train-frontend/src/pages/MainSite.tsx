import { Carousel } from "react-bootstrap"
import { Header } from "../components/Header"
import "../css/mainsite.css"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

export const MainSite=()=>{
    const [index, setIndex] = useState(0)
    const weatherApp=`<div id="ww_b52383e215d29" v='1.3' loc='auto' a='{"t":"responsive","lang":"hu","sl_lpl":1,"ids":[],"font":"Arial","sl_ics":"one_a","sl_sot":"celsius","cl_bkg":"image","cl_font":"#FFFFFF","cl_cloud":"#FFFFFF","cl_persp":"#81D4FA","cl_sun":"#FFC107","cl_moon":"#FFC107","cl_thund":"#FF5722"}'>Weather Data Source: <a href="https://tiempolargo.com/" id="ww_b52383e215d29_u" target="_blank">tiempolargo.com</a></div><script async src="https://app1.weatherwidget.org/js/?id=ww_b52383e215d29"></script>`
    const handleSelect = (selectedIndex:number, e:any) => {
        setIndex(selectedIndex);
    }
    const [userNumber,setUserNumber]=useState(0)
    const getUserNumber=async()=>{
        axios.get("http://localhost:5000/get_number_of_users").then((resp)=>{setUserNumber(resp.data.number)})
    }
    useEffect(()=>{getUserNumber()},[])

    return(
        <div className="container-fluid m-0 p-0">
            <Header/>
            <div className="main-main d-flex justify-content-evenly">
                <div className="statistics d-flex align-items-center">
                    <div>
                        <h3>Regisztrált felhasználóink száma:</h3>
                        <h4>{userNumber}</h4>
                        <div><Link to="/signup">Regisztrálj</Link> te is!</div>
                    </div>
                </div>
               <div className="slide">
                   <Carousel activeIndex={index} onSelect={handleSelect}>
                    <Carousel.Item>
                        <img src="https://www.napi.hu/fototar/fototar/201907/orig/image1563275816_cropped_16-9_at_1565598963.jpg/800/?v=2023011102" alt="First slide" />
                        <Carousel.Caption>
                            <h3>Üdvözöllek az oldalon!</h3>
                            <div>Nézz körül, sok érdekességet találhatsz!</div>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Link to="/electric">
                            <img src="https://szeged365.hu/wp-content/uploads/2022/12/szili_2_0-780x470.jpg" alt="Second slide" />
                            <Carousel.Caption>
                                <h3>Villamos mozdonyok</h3>
                                <div>Kattints a képre!</div>
                            </Carousel.Caption>
                        </Link>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Link to="/diesel">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/P%C3%BApos.jpg/640px-P%C3%BApos.jpg" alt="Third slide" />
                            <Carousel.Caption>
                                <h3>Dízel mozdonyok</h3>
                                <div>Kattints a képre!</div>
                            </Carousel.Caption>
                        </Link>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Link to="/munit">
                            <img src="https://www.gyorplusz.hu/wp-content/uploads/2019/12/kiss_velim-700x467.jpg" alt="Fourth slide" />
                            <Carousel.Caption>
                                <h3>Motorvonatok</h3>
                                <div>Kattints a képre!</div>
                            </Carousel.Caption>
                        </Link>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Link to="/nostalgia">
                            <img src="https://www.villanylap.hu/images/4/4507-1494412915.jpg" alt="Fifth slide" />
                            <Carousel.Caption>
                                <h3>Nosztalgia vonatok</h3>
                                <div>Kattints a képre!</div>
                            </Carousel.Caption>
                        </Link>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Link to="/surprise">
                            <img src="https://radzion.com/static/6787494a2c7c1634ef2e0e988ef82ccb/ddb6f/main.png" alt="Sixth slide" />
                            <Carousel.Caption>
                                <h3>Meglepetés</h3>
                                <div>Kattints a képre!</div>
                            </Carousel.Caption>
                        </Link>
                    </Carousel.Item>
                   </Carousel>
               </div>
                <div className="contacts d-flex align-items-center">
                    <div>
                        <h3>Visszajelzésed van?</h3>
                        <div>Keressen minket a <Link to="#" onClick={(e)=>{
                                window.location.href="mailto:pazpank@mailbox.unideb.hu"
                                e.preventDefault()}}>
                            pazpank@mailbox.unideb.hu
                            </Link> email-címen!</div>
                    </div>
                </div> 
            </div>
        </div>
    )
}