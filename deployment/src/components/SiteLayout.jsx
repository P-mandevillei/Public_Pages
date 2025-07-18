import { useContext, useEffect, useId, useRef, useState } from "react";
import { Nav, Navbar, Container, Form, Card, ToastContainer, Toast,  } from "react-bootstrap";
import { Link, Navigate, Outlet, useNavigate, useParams } from "react-router";
import { useTranslation } from 'react-i18next';
import LoginContext from "../contexts/loginContext";
import { HashLoader } from "react-spinners";
import { AnimatePresence, motion } from "motion/react";

const langs = ['en', 'cn'];

function ConnectToDB(props) {

    const { t } = useTranslation('siteLayout');

    if (props.connection === null) {
        return <Navbar.Text className="shrink tertiaryColor">
            <HashLoader cssOverride={{display: 'inline-block'}} size={'1em'} color='rgb(228, 193, 153)' />
            {' '}
            {t('connecting')}
        </Navbar.Text>
    } else if (!props.connection) {
        return <Navbar.Text className="shrink tertiaryColor selectable tertiaryColorHover" onClick={()=>props.checkLogin()}> 
            {t('noConnection')}
        </Navbar.Text>
    } else {
        return <></>
    }
}

export default function SiteLayout(props) {

    const { lang } = useParams();
    const [oppositeLang, setOppositeLang] = useState();
    const { i18n } = useTranslation();
    const nav = useNavigate();
    
    useEffect(()=>{
        if (langs.includes(lang)) {
            i18n.changeLanguage(lang);
            if (lang === 'en') {
                setOppositeLang('cn');
            } else {
                setOppositeLang('en');
            }
        } else {
            nav('/en');
        }
    }, [lang, i18n]);

    const { t } = useTranslation('siteLayout');

    function switchLang() {
        const currentPath = window.location.hash.split(`/${lang}`)[1]?? '';
        nav(`/${oppositeLang}${currentPath}`);
    }
    
    const [showQR, setShowQR] = useState(false);

    const [loggedIn, setLoggedIn, checkLogin, connection] = useContext(LoginContext);

    return <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
        <AnimatePresence>
            {showQR && (<motion.div
                className="backdropWhole"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.5}}
            />)}
        </AnimatePresence>

        <Navbar bg="dark" data-bs-theme="dark" sticky="top" expand="lg" className="bg-body-tertiary primaryColorBg">
        <Container>
            <Navbar.Brand as={Link} to=''>
                <img
                    src="/logo.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link as={Link} to="">{t('home')}</Nav.Link>
                <Nav.Link as={Link} to="focus">{t('focus')}</Nav.Link>
                <Nav.Link as={Link} to='aquarium_calculator'>{t('calculator')}</Nav.Link>
                <Nav.Link as={Link} to='about'>{t('about')}</Nav.Link>
                <Nav.Link onClick={switchLang}>
                    {lang==='en'? '切换至中文/CHN' : 'Switch to ENG/英文'}
                </Nav.Link>
                <ConnectToDB connection={connection} checkLogin={checkLogin} />
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>

        <div style={{flex: 1, minHeight: '90vh', display: 'flex', flexDirection: 'column'}} >
            <Outlet />
        </div>

        <ToastContainer className="p-3" position="middle-center" style={{position: 'fixed'}}>
            <Toast className="secondaryColor tertiaryColorReverseBg" show={showQR} onClose={()=>{setShowQR(old=>!old)}}>
                <Toast.Header>
                    <span style={{flex: 1}}>
                        {t('scan')}
                    </span>
                </Toast.Header>
                <Toast.Body style={{display: 'flex', flexDirection: 'column'}}>
                    <img 
                        className="selectable margin" 
                        src="/wechatQR.jpg" 
                        alt="An QR code for the official account of A Nature Sanctuary on WeChat" 
                        onClick={()=>{window.open("https://www.wechat.com/", "_blank")}}
                        style={{
                            aspectRatio: '1/1'
                        }}
                    />
                </Toast.Body>
            </Toast>
        </ToastContainer>
        
        <Navbar className="primaryColorBg" bg="dark" data-bs-theme="dark"
            style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <img 
                    className="selectable margin iconShrink" 
                    src="/github.png" 
                    alt="github logo redirect" 
                    onClick={()=>{window.open("https://github.com/P-mandevillei", "_blank")}}
                    style={{
                        aspectRatio: '1/1',
                        height: 30
                    }}
                />
                <img 
                    className="selectable margin iconShrink" 
                    src="/wechatIcon_no_bg.jpg"
                    alt="WeChat logo that opens an QR code" 
                    onClick={()=>{setShowQR(true)}}
                    style={{
                        aspectRatio: '1.3/1',
                        height: 30
                    }}
                />
                
                <img 
                    className="selectable margin iconShrink" 
                    src="/ins_icon.png"
                    alt="Instagram logo that links to my Instagram homepage" 
                    onClick={()=>{window.open('https://www.instagram.com/a.nature.sanctuary', '_blank')}}
                    style={{
                        aspectRatio: '1/1',
                        height: 30
                    }}
                />
                <img 
                    className="selectable margin iconShrink" 
                    src="/email_icon.png"
                    alt="E-mail logo that links to my email address" 
                    onClick={()=>{window.open('mailto:p.mandevillei38324@gmail.com')}}
                    style={{
                        aspectRatio: '1/1',
                        height: 30
                    }}
                />
            </div>
            <Navbar.Text className="pad shrink">
                {t('disclaimer')}
            </Navbar.Text>
        </Navbar>
    </div>

}