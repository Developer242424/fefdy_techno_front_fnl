import React, { useEffect, useState, useRef } from "react";
import "./subtopic.css";
import giphy from "../../defaults/img/giphy.gif";
import activity from "../../defaults/img/activity.gif";
import activity_match from "../../defaults/img/activity_match.gif";

import titleicon from "../../defaults/img/title-icon.png";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import LayeredSVG from "./LayeredSVG";
import StageModal from "./stagemodal";
function Subtopic() {
    const publicURL = process.env.REACT_APP_PUBLIC_API_URL;
    const videoURL = "https://fefdygames.com/erpvideos/";
    const [topics, setTopics] = useState([]);
    const [subtopics, setSubtopics] = useState([]);
    const [subtopicsdata, setSubtopicData] = useState([]);
    const [activeTabItem, setActiveTabItem] = useState(null);
    const [activeLeftTab, setActiveLeftTab] = useState(null);
    const { auth, setCommonError } = useAuth();
    const navigate = useNavigate();
    const subject = JSON.parse(localStorage.getItem("subject"));
    const topic = JSON.parse(localStorage.getItem("topic"));
    const level = JSON.parse(localStorage.getItem("level"));

    const [videoDuration, setVideoDuration] = useState(0);
    const [playedSeconds, setPlayedSeconds] = useState(0);
    const reactPlayerRef = useRef(null);
    const [lastVisibleTime, setLastVisibleTime] = useState(0);

    const [pdfBlobUrl, setPdfBlobUrl] = useState(null);

    const [ShowStageModal, setShowStageModal] = useState(false);
    const openStageModal = () => setShowStageModal(true);
    const closeStageModal = () => setShowStageModal(false);

    useEffect(() => {
        if (!auth.token) navigate("/login");
        if (!level) navigate("/level");

        const fetchTopics = async () => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}topics`, {
                    token: auth.token,
                    subject: subject,
                });
                if (res.data.status === 200) {
                    setTopics(res.data.data);
                } else {
                    console.error("Error fetching data:", res.data.message);
                    navigate("/login");
                }
            } catch (error) {
                console.error("Error fetching topics:", error);
            }
        };

        const fetchSubtopics = async () => {
            try {
                const res = await axios.post(
                    `${process.env.REACT_APP_API_URL}subtopics`,
                    {
                        token: auth.token,
                        level: level,
                    }
                );
                if (res.data.status === 200) {
                    const fnl_data = res.data.data;
                    setSubtopics(fnl_data);
                    if (fnl_data.length > 0) {
                        setActiveLeftTab(fnl_data[0]);
                        subtopicsData(fnl_data[0], fnl_data[0].title);
                    } else {
                        setTimeout(() => {
                            navigate("/level");
                        }, 2000);
                        localStorage.removeItem("level");
                        setCommonError("Subtopics not found");
                    }
                } else {
                    console.error("Error fetching data:", res.data.message);
                    navigate("/login");
                }
            } catch (error) {
                console.error("Error fetching subtopics:", error);
            }
        };

        fetchTopics();
        fetchSubtopics();
    }, [auth.token, navigate]);

    const getSubtopicsList = async () => {
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}subtopics`,
                {
                    token: auth.token,
                    level: level,
                }
            );
            if (res.data.status === 200) {
                const fnl_data = res.data.data;
                setSubtopics(fnl_data);
                if (fnl_data.length > 0) {
                    // setActiveLeftTab(fnl_data[0]);
                    // subtopicsData(fnl_data[0], fnl_data[0].title);
                } else {
                    setTimeout(() => {
                        navigate("/level");
                    }, 2000);
                    localStorage.removeItem("level");
                    setCommonError("Subtopics not found");
                }
            } else {
                console.error("Error fetching data:", res.data.message);
                navigate("/login");
            }
        } catch (error) {
            console.error("Error fetching subtopics:", error);
        }
    };

    const subtopicsData = async (subtopic, title) => {
        setActiveLeftTab(subtopic);
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}subtopicdata`,
                {
                    token: auth.token,
                    subtopic: subtopic.id,
                }
            );
            if (res.data.status === 200) {
                setSubtopicData(res.data.data);
                setActiveTabItem(res.data.data.length > 0 ? res.data.data[0] : null);
                const subtopicElement =
                    document.getElementsByClassName("subtopic-text")[0];
                if (subtopicElement) {
                    subtopicElement.innerHTML = title;
                }
            } else {
                console.error("Error fetching data:", res.data.message);
            }
        } catch (error) {
            console.error("Error fetching subtopic data:", error);
        }
    };

    const levelPage = (topic) => {
        localStorage.setItem("topic", JSON.stringify(topic));
        navigate("/level");
    };

    const subtopic_id = activeLeftTab?.id;
    const category_id = activeTabItem?.id;
    const cat_data_id = activeTabItem?.cat_data?.id;

    useEffect(() => {
        if (activeTabItem?.type?.toLowerCase() === "pdf") {
            playSeconds(0, 0, "onpage", subtopic_id, category_id, cat_data_id);
        }
    }, [activeTabItem]);

    const [lastTtlSecs, setLastTtlSecs] = useState(null);
    const playSeconds = async (
        ttl_secs,
        play_secs,
        status,
        subtopic,
        category,
        subtopic_data
    ) => {
        const ttl_seconds = ttl_secs !== null ? ttl_secs : lastTtlSecs;
        if (ttl_secs !== null && ttl_secs > 0) {
            setLastTtlSecs(ttl_secs);
        }
        const play_seconds = play_secs !== null ? play_secs : 0;
        // console.log(ttl_seconds, play_seconds);
        const ttlFormatted = formatTime(ttl_seconds);
        const playFormatted = formatTime(play_seconds);

        // console.log("Total Duration:", ttlFormatted);
        // console.log("Played Duration:", playFormatted);
        // console.log("Status:", status);
        // console.log("Subtopic ID:", subtopic);
        // console.log("Category ID:", category);
        // console.log("Category Data ID:", subtopic_data);

        const res = await axios.post(
            `${process.env.REACT_APP_API_URL}history-entry`,
            {
                token: auth.token,
                subtopic,
                category,
                subtopic_data,
                ttl_time: ttlFormatted,
                seen_time: playFormatted,
            }
        );
        const resData = res.data;
        if (resData.status === 200) {
            getSubtopicsList();
        } else if (resData.status === 401) {
            navigate("/login");
            console.error("Error fetching data:", resData.message);
        } else if (resData.status === 400) {
            console.log("Error fetching data:", resData.message);
        } else if (resData.status === 500) {
            console.error("Error fetching data:", resData.message);
        }
    };

    const formatTime = (secs) => {
        const minutes = Math.floor(secs / 60)
            .toString()
            .padStart(2, "0");
        const seconds = Math.floor(secs % 60)
            .toString()
            .padStart(2, "0");
        return `${minutes}:${seconds}`;
    };

    useEffect(() => {
        const fetchPdf = async () => {
            if (!activeTabItem?.cat_data?.source) return;

            try {
                const res = await axios.post(
                    `${process.env.REACT_APP_API_APP_URL}proxy-pdf`,
                    { pdf_url: publicURL + activeTabItem.cat_data.source },
                    { responseType: "blob" }
                );
                const blob = new Blob([res.data], { type: "application/pdf" });
                const url = URL.createObjectURL(blob);
                setPdfBlobUrl(url);
            } catch (err) {
                console.error("Error fetching PDF:", err.message);
            }
        };

        if (activeTabItem?.type?.toLowerCase() === "pdf") {
            fetchPdf();
        }
    }, [activeTabItem]);

    const totalSubtopics = subtopics.length;
    const completedSubtopics = subtopics.filter(
        (item) => item.is_completed === 1
    ).length;

    const completionPercentage =
        totalSubtopics > 0
            ? Math.round((completedSubtopics / totalSubtopics) * 100)
            : 0;

    // console.log(`Completed: ${completedSubtopics}/${totalSubtopics}`);
    // console.log(`Progress: ${completionPercentage}%`);

    // console.log("sub len: "+subtopics.length);
    // console.log("comp sub len: "+completed_subs.length);

    // console.log(activeLeftTab)

    const [stageModalShowedIds, setStageModalShowedIds] = useState(() => {
        // On first load, pull from localStorage if it exists
        const stored = localStorage.getItem('stageModalShowedIds');
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        if (activeLeftTab?.is_completed === 1) {
            setStageModalShowedIds(prev => {
                const updated = prev.includes(activeLeftTab?.id) ? prev : [...prev, activeLeftTab?.id];
                localStorage.setItem('stageModalShowedIds', JSON.stringify(updated));
                return updated;
            });
            if (!stageModalShowedIds.includes(activeLeftTab?.id)) {
                openStageModal()
            }
        }
    }, [activeLeftTab]);

    useEffect(() => {
        if (stageModalShowedIds.length > 0) {
            console.log("Stored ids", stageModalShowedIds.join(","));
        }
    }, [stageModalShowedIds]);

    return (
        <div className="section-content">
            <div className="row">
                {/* Sidebar Icons */}
                <div className="col-md-12 col-lg-1 col-xl-1 pr-0 pr-lg-20">
                    <div className="scroll-wrapper">
                        <div className="tm-sc-justos-funfact mb-md-50">
                            {topics.length > 0 ? (
                                topics.map((value) => (
                                    <div
                                        key={value.id}
                                        className="tm-sc-funfact funfact funfact-lefticon mb-20 text-md-center text-lg-start"
                                    >
                                        <div
                                            className={`funfact-icon float-left mr-40 bg-theme-colored1${topic === value.id ? " active" : ""
                                                }`}
                                            style={{ cursor: "pointer" }}
                                            onClick={() => levelPage(value.id)}
                                        >
                                            <img src={publicURL + value.thumbnail} alt="" />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                /* <p>Data not found</p>*/
                                <div class="loader"></div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Left Side Content */}
                <div className="col-md-12 col-lg-3 col-xl-3">
                    <div className="tm-sc-jus-feature-box">
                        <div className="tm-sc-icon-box icon-box icon-left iconbox-centered-in-responsive iconbox-theme-colored1 animate-icon-on-hover animate-icon-rotate-y pd-res-40">
                            <div className="icon-box-wrapper">
                                <a href="#">
                                    <div className="icon-wrapper">
                                        <img src={titleicon} alt="Title Icon" />
                                    </div>
                                </a>
                                <div className="icon-text">
                                    <div className="content">
                                        <h4 className="text-theme-colored1 subtopic-text">
                                            WATER -{" "}
                                            <span class="sub-topic-heading">
                                                Introduction to water
                                            </span>
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="tm-sc-about-area our-faq pl-20 pl-lg-20 pl-sm-0">
                        <div className="entry-content">
                            <div className="progress-container">
                                <div
                                    className="progress"
                                    style={{ height: `${completionPercentage}%` }}
                                    id="progress_step_path"
                                ></div>
                                <ul className="step-progress">
                                    {subtopics.length > 0 ? (
                                        subtopics.map((value, index) => (
                                            <li
                                                key={value.id}
                                                className={`step ${activeLeftTab?.id === value.id ? "active_step" : ""
                                                    }`}
                                            >
                                                <a
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        subtopicsData(value, value.title);
                                                    }}
                                                >
                                                    <span
                                                        className={`circle2 ${activeLeftTab?.id === value.id ||
                                                            value.is_completed === 1
                                                            ? "active"
                                                            : ""
                                                            }`}
                                                    >
                                                        {index + 1}
                                                    </span>
                                                    <span className="text">{value.title}</span>
                                                </a>
                                                {activeLeftTab?.id === value.id && (
                                                    <span className="step-gif">
                                                        <img src={giphy} alt="progress gif" />
                                                    </span>
                                                )}
                                            </li>
                                        ))
                                    ) : (
                                        <p>Data not found</p>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="col-md-12 col-lg-8 col-xl-8">
                    <div className="tm-sc-nav-tabs-pricing subtopics nav-tab-btn-button button-rounded">
                        <ul className="nav nav-tabs">
                            {subtopicsdata.map((value) => {
                                return (
                                    <li
                                        key={value.id}
                                        className={`nav-item ${activeTabItem?.id === value.id ? "active" : ""
                                            }`}
                                        onClick={() => setActiveTabItem(value)}
                                    >
                                        <a
                                            href="#"
                                            className={`nav-link ${activeTabItem?.id === value.id ? "active" : ""
                                                }`}
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            <span className="title">
                                                <img
                                                    style={{ height: "100%" }}
                                                    src={publicURL + value.thumbnail}
                                                />
                                            </span>
                                        </a>
                                    </li>
                                );
                            })}
                            <li className={`nav-item`}>
                                <a
                                    target="_blank"
                                    href={`https://feboo.fefdybraingym.com/admin/chooseup?sid=${subject}&tid=${topic}&lid=${level}&stid=${activeLeftTab?.id}&qid=1&ust=${auth.token}`}
                                    className={`nav-link `}
                                >
                                    <span className="title">
                                        <img style={{ height: "100%" }} src={activity} />
                                    </span>
                                </a>
                            </li>
                            <li className={`nav-item`}>
                                <a
                                    target="_blank"
                                    href={`https://feboo.fefdybraingym.com/admin/match?sid=${subject}&tid=${topic}&lid=${level}&stid=${activeLeftTab?.id}&qid=2&ust=${auth.token}`}
                                    className={`nav-link `}
                                >
                                    <span className="title">
                                        <img style={{ height: "100%" }} src={activity_match} />
                                    </span>
                                </a>
                            </li>
                            <li className={`nav-item`}>
                                <a
                                    href="#"
                                    className={`nav-link `}
                                    onClick={(e) => openStageModal()}
                                >
                                    <span className="title">
                                        Stg
                                    </span>
                                </a>
                            </li>
                        </ul>

                        <div className="tab-content mt-3">
                            {activeTabItem?.type?.toLowerCase() === "pdf" && (
                                <div className="tab-pane fadeInLeft active show">
                                    <div className="tab-pane-inner">
                                        <div className="row">
                                            {activeTabItem.cat_data !== null ? (
                                                // pdfBlobUrl ? (
                                                //   // <Flipbook src={pdfBlobUrl} initialScale={0.5} />
                                                //   <iframe
                                                //     className="scroll"
                                                //     src={`pdfrender.html?pdf=${encodeURIComponent(
                                                //       publicURL + activeTabItem?.cat_data?.source
                                                //     )}`}
                                                //     style={{
                                                //       border: 0,
                                                //       width: "100%",
                                                //       height: "59vh",
                                                //       position: "absolute",
                                                //       top: "-30px",
                                                //     }}
                                                //     allowFullScreen
                                                //     frameBorder="0"
                                                //   ></iframe>
                                                // ) : (
                                                //   <p>-</p>
                                                // )
                                                <LayeredSVG
                                                    src={publicURL + activeTabItem?.cat_data?.source}
                                                />
                                            ) : (
                                                <p>No book available</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {activeTabItem?.type?.toLowerCase() === "video" && (
                                <div className="tab-pane fadeInLeft active show">
                                    <div className="tab-pane-inner">
                                        {activeTabItem.cat_data !== null ? (
                                            <div className="row">
                                                {activeTabItem?.cat_data?.source?.includes(
                                                    "youtube.com"
                                                ) ||
                                                    activeTabItem?.cat_data?.source?.includes(
                                                        "youtu.be"
                                                    ) ? (
                                                    <div
                                                        style={{ position: "relative", paddingTop: "42vh" }}
                                                    >
                                                        <ReactPlayer
                                                            ref={reactPlayerRef}
                                                            url={activeTabItem.cat_data.source}
                                                            width="100%"
                                                            height="100%"
                                                            style={{ position: "absolute", top: 0, left: 0 }}
                                                            controls
                                                            onProgress={({ playedSeconds }) => {
                                                                // console.log(Math.round(playedSeconds));
                                                                setPlayedSeconds(Math.round(playedSeconds));
                                                                // playSeconds(null, Math.round(playedSeconds));
                                                            }}
                                                            onDuration={(duration) => {
                                                                // console.log(Math.round(duration));
                                                                setVideoDuration(Math.round(duration));
                                                                // playSeconds(Math.round(duration), null);
                                                            }}
                                                            onPause={() => {
                                                                const player = reactPlayerRef.current;
                                                                const currentTime = player
                                                                    ? Math.round(player.getCurrentTime())
                                                                    : 0;
                                                                const totalDuration = player
                                                                    ? Math.round(player.getDuration())
                                                                    : 0;
                                                                playSeconds(
                                                                    totalDuration,
                                                                    currentTime,
                                                                    "onpause",
                                                                    subtopic_id,
                                                                    category_id,
                                                                    cat_data_id
                                                                );
                                                            }}
                                                            onEnded={() => {
                                                                const player = reactPlayerRef.current;
                                                                const currentTime = player
                                                                    ? Math.round(player.getCurrentTime())
                                                                    : 0;
                                                                const totalDuration = player
                                                                    ? Math.round(player.getDuration())
                                                                    : 0;
                                                                playSeconds(
                                                                    totalDuration,
                                                                    currentTime,
                                                                    "onend",
                                                                    subtopic_id,
                                                                    category_id,
                                                                    cat_data_id
                                                                );
                                                            }}
                                                        />
                                                    </div>
                                                ) : (
                                                    <video
                                                        className="scroll"
                                                        style={{ border: 0, width: "100%", height: "50vh" }}
                                                        controls
                                                        preload="auto"
                                                        autobuffer
                                                        controlsList="nodownload"
                                                        onTimeUpdate={(e) => {
                                                            // console.log(Math.round(e.target.currentTime));
                                                            // console.log(Math.round(e.target.duration));
                                                            // setPlayedSeconds(Math.round(e.target.currentTime));
                                                            // setVideoDuration(Math.round(e.target.duration));
                                                            // playSeconds(
                                                            //   Math.round(e.target.duration),
                                                            //   Math.round(e.target.currentTime)
                                                            // );
                                                        }}
                                                        onPause={(e) => {
                                                            const current = Math.round(e.target.currentTime);
                                                            const duration = Math.round(e.target.duration);
                                                            playSeconds(
                                                                duration,
                                                                current,
                                                                "onpause",
                                                                subtopic_id,
                                                                category_id,
                                                                cat_data_id
                                                            );
                                                        }}
                                                        onEnded={(e) => {
                                                            const current = Math.round(e.target.currentTime);
                                                            const duration = Math.round(e.target.duration);
                                                            playSeconds(
                                                                duration,
                                                                current,
                                                                "onend",
                                                                subtopic_id,
                                                                category_id,
                                                                cat_data_id
                                                            );
                                                        }}
                                                    >
                                                        <source
                                                            src={videoURL + activeTabItem?.cat_data?.source}
                                                            type="video/mp4"
                                                        />
                                                        Your browser does not support the video tag.
                                                    </video>
                                                )}
                                            </div>
                                        ) : (
                                            <p>No video available</p>
                                        )}
                                    </div>
                                </div>
                            )}
                            {ShowStageModal && <StageModal StageonClose={closeStageModal} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Subtopic;
