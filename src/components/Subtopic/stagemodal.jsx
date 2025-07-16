import React from "react";
import StageModalMP3 from "../../defaults/files/clap.mp3";
import clapImg from "../../defaults/img/clap.gif";
import particlesGif from "../../defaults/img/particles.gif";
// import { backgroundImage } from "html2canvas/dist/types/css/property-descriptors/background-image";


const StageModal = ({ StageonClose, ActiveLeftTab, TopicData }) => {
    return (
        <div style={styles.backdrop}>
            <div style={styles.modal}>
                <div style={styles.content}>
                    <h2 className="stage_heading">Congratulations</h2>
                    <img className="clap_img" src={clapImg} alt="" />
                    <h4>You are complete the</h4>
                    <h3>{TopicData?.title} - {ActiveLeftTab?.title}</h3>
                    <p className="mb-0">Your Score for this stage</p>
                    <h1 className="stage_score">{ActiveLeftTab?.got_mark}/{ActiveLeftTab?.ttl_mark}</h1>
                </div>

                <audio src={StageModalMP3} autoPlay />
                <button className="btn btn-primary float-end" onClick={StageonClose}>Close</button>
            </div>
        </div>
    );
};

const styles = {
    backdrop: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999999999,
    },
    modal: {
        backgroundColor: "#fff",
        backgroundImage: `url(${particlesGif})`,
        backgroundSize: "cover",      // Optional: make it fit the modal
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        padding: "20px",
        borderRadius: "8px",
        width: "60%",
        height: "630px",
        textAlign: "center",
        border: "3px solid #fd6abb",
        position: "relative",
        overflow: "hidden",

    },

};

export default StageModal;
