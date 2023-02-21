import { Button, Carousel, Modal, ModalBody, ModalHeader, ModalTitle, Toast } from "react-bootstrap"
import { Header } from "../components/Header"
import "../css/mainsite.css"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { AuthMessage } from "../components/AuthMessage"

export const MainSite=()=>{
    const [index, setIndex] = useState(0)

    const handleSelect = (selectedIndex:number, e:any) => {
        setIndex(selectedIndex);
    }

    return(
        <div className="container-fluid m-0 p-0">
            <Header/>
            <AuthMessage/>
            <div className="main-main">
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
                            </Carousel.Caption>
                        </Link>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Link to="/diesel">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/P%C3%BApos.jpg/640px-P%C3%BApos.jpg" alt="Third slide" />
                            <Carousel.Caption>
                                <h3>Dízel mozdonyok</h3>
                            </Carousel.Caption>
                        </Link>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Link to="/munit">
                            <img src="https://www.gyorplusz.hu/wp-content/uploads/2019/12/kiss_velim-700x467.jpg" alt="Fourth slide" />
                            <Carousel.Caption>
                                <h3>Motorvonatok</h3>
                            </Carousel.Caption>
                        </Link>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Link to="/nostalgia">
                            <img src="https://www.villanylap.hu/images/4/4507-1494412915.jpg" alt="Fifth slide" />
                            <Carousel.Caption>
                                <h3>Nosztalgia vonatok</h3>
                            </Carousel.Caption>
                        </Link>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Link to="/surprise">
                            <img src="https://radzion.com/static/6787494a2c7c1634ef2e0e988ef82ccb/ddb6f/main.png" alt="Sixth slide" />
                            <Carousel.Caption>
                                <h3>Meglepetés</h3>
                            </Carousel.Caption>
                        </Link>
                    </Carousel.Item>
                   </Carousel>
               </div>
            </div>
        </div>
    )
}
 /*<div id="carouselIndicators" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#carouselIndicators" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselIndicators" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="d-block w-80" src="https://cdn.vg.hu/2022/09/U1r5U6Zzxqm7vK9lkkb_Q_a4vGPwhHDybWwCAxxaRZM/fit/750/500/no/1/aHR0cHM6Ly9jbXNjZG4uYXBwLmNvbnRlbnQucHJpdmF0ZS9jb250ZW50Lzg5NjFiOTJmNzE5OTRlNzE4N2U1YmVlMTE4MWE0NTE3.jpg" alt="First slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-80" src="https://www.mavcsoport.hu/sites/default/files/styles/width_1260/public/upload/dsc_0306.jpg?itok=tO9Uyd_o" alt="Second slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-80" src="https://www.villanylap.hu/images/4/4507-1494412915.jpg" alt="Third slide" />
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Előző</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Következő</span>
                    </a>
                </div>*/