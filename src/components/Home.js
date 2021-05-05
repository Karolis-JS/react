import img from '../img/home.jpg'

function Home() {
    return (
        <div className="w-100 overflow">
            <h1 className="homeTittle">Pasaulio virtuvės receptai</h1>
            <div className="homeDescription">
                <p><b>Pasaulio virtuvės receptai</b> - tai vieta, kurioje gali keliauti per neatrastus pasaulio tautų skonius, dalintis savais potyriais, ar įvertinti kito keliautojo jau atrastus lobius. </p>
                <div className="greeting "><b>Skanaus!</b></div>
            </div>
            <img className="homeImg" src={img} alt=""/>
        </div>
    );
}

export default Home;