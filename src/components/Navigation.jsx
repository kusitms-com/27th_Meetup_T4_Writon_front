import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  authState,
  detailuserState,
  sideToggleState,
  activeChallengeState,
  mypageInfoState,
} from "../atoms/auth";
import { patchLogoutUser, postLoginMain, getMypageInfo } from "../remotes";

const Navigation = () => {
  const navigate = useNavigate();
  const [listToggle, setListToggle] = useRecoilState(sideToggleState);
  const [userToggle, setUserToggle] = useState(false);
  const [auth, setAuth] = useRecoilState(authState);
  const detailuser = useRecoilValue(detailuserState);
  const activeChallenge = useRecoilValue(activeChallengeState);
  const [userId, setUserId] = useState("");
  const setDetailuser = useSetRecoilState(detailuserState);
  const setActiveChallenge = useSetRecoilState(activeChallengeState);

  const sidebarToggle = () => {
    setListToggle(!listToggle);
  };
  const userInfoToggle = () => {
    setUserToggle(!userToggle);
  };

  const Logout = () => {
    patchLogoutUser()
      .then((res) => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setAuth(false);
        navigate("/");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const SpaceHome = () => {
    navigate("/");
  };

  const SpaceToLogin = () => {
    navigate("/login");
  };

  const SpaceToRegister = () => {
    navigate("/register");
  };

  const SpaceToMypage = () => {
    setUserToggle(false);
    navigate("/mypage");
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      postLoginMain()
        .then((res) => {
          setDetailuser({
            nickname: res.data.data.nickname,
            challengeCertain: res.data.data.challengeCertain,
          });
          setActiveChallenge({
            userChallengeSu: res.data.data.userChallengeSu,
            coopen: res.data.data.coopen,
            userChallengeArray: res.data.data.userChallengeArray,
          });
          setAuth(true);
        })
        .catch((err) => {
          if (err.response.data.code === 419) {
            //Retoken();
            //getLoginMain();// 재귀함수? 필요없나.. 고민
          } else {
            console.log(err);
          }
        });

      getMypageInfo()
        .then((res) => {
          setUserId(res.data.responseData.identifier);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <Container>
      <ContainerLeft>
        <div className="navi-logo">
          <img
            onClick={SpaceHome}
            width={157}
            height={80}
            src="/writon_logo_blue.svg"
          />
        </div>
        <div className="navi-list">
          <img onClick={sidebarToggle} src="/menu.svg" />
        </div>
      </ContainerLeft>
      <ContainerRight>
        <div className={auth ? "after-right" : "before-right"}>
          <div className="challenge-title">
            <div>5월 25일 오늘 진행 중인 챌린지 </div>
            <div className="count">
              {activeChallenge.userChallengeSu} /
              {activeChallenge.coopen ? " ∞" : " 2"}
            </div>
          </div>
          {auth ? (
            <div className="user-info">
              <div className="user-info-container" onClick={userInfoToggle}>
                <img width={22} src="/user_img.svg" />
                <div className="name">{detailuser.nickname}</div>
              </div>

              {userToggle ? (
                <div>
                  <div className="drop">
                    <div className="user">
                      <div className="user-name">
                        <img src="/drop_user_img.svg" />
                        {detailuser.nickname}
                      </div>
                      <div className="user-id">{userId || "아이디"}</div>
                    </div>
                    <div className="mypage" onClick={SpaceToMypage}>
                      <img src="/drop_user.svg" />
                      마이페이지
                    </div>
                    <div className="logout" onClick={Logout}>
                      <img width={14} src="/logout.svg" />
                      로그아웃
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            <div className="before-user">
              <div onClick={SpaceToLogin}>로그인</div>
              <div onClick={SpaceToRegister}>회원가입</div>
            </div>
          )}
        </div>
      </ContainerRight>
    </Container>
  );
};

export default Navigation;

const Container = styled.div`
  min-width: 920px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background-color: #266cf4;
  display: flex;

  /* justify-content: space-between; */
  align-items: center;
  padding-left: 60px;
  padding-right: 74px;
  padding-left: 30px;
  padding-right: 30px;
  z-index: 10;
  a {
    color: #ffffff;
    text-decoration: none;
  }
  z-index: 2;
`;

const ContainerLeft = styled.div`
  display: flex;
  position: absolute;

  .navi-list {
    position: absolute;
    z-index: 4;
    top: 25px;
    cursor: pointer;
    left: -10px;
  }

  .navi-logo {
    margin-left: 25px;
  }
  .navi-logo img {
    cursor: pointer;
  }
`;

const ContainerRight = styled.div`
  width: 100%;
  .before-right {
    display: flex;
    margin: auto;
    margin-left: 205px;
    justify-content: space-between;
    width: 81.29%;
    z-index: 2;
  }

  .after-right {
    display: flex;
    margin: auto;
    margin-left: 205px;
    justify-content: space-between;
    width: 84.65%;
    z-index: 2;
  }

  .before-user {
    width: 134px;
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 16px;

    color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .before-user div {
    cursor: pointer;
  }

  .challenge-title {
    display: flex;
    font-family: "Happiness-Sans-Bold";
    color: #ffffff;
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    align-items: center;
  }
  .count {
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    margin-left: 8px;
    color: #ffffff;
  }

  .user-info {
    color: #ffffff;
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid #d9d9d9;
    border-radius: 32px;
    width: 104px;
    height: 38px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    position: relative;
  }
  .user-info-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .user-info .name {
    width: 50px;
    margin-left: 8px;
    margin-right: 8px;
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 16px;
    white-space: nowrap; /* 줄 바꿈 없이 한 줄에 텍스트를 표시 */
    overflow: hidden; /* 너비를 넘어가는 텍스트를 숨김 */
    text-overflow: ellipsis;
  }

  .sign {
    display: block;
  }

  .drop {
    position: absolute;
    z-index: 3;
    width: 220px;
    height: 147px;
    background-color: #ffffff;
    margin-top: 28px;
    right: 0;
    border-radius: 8px;
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 14px;
    box-shadow: 0px 2px 38px -8px rgba(39, 39, 39, 0.2);
    color: #272727;
  }

  .drop .user {
    height: 67px;
    width: 218px;
    border-bottom: 1px solid #e2e4e7;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .user .user-name {
    display: flex;
    align-items: center;
  }
  .user .user-id {
    margin-left: 40px;
    font-size: 12px;
    line-height: 16px;
    margin-top: 10px;
    color: #72777a;
  }

  .drop .mypage {
    height: 40px;
    width: 218px;
    border-bottom: 1px solid #e2e4e7;
    display: flex;
    align-items: center;
  }

  .drop img {
    margin-right: 8px;
    margin-left: 17px;
  }

  .drop .logout {
    display: flex;
    align-items: center;
    height: 40px;
    width: 218px;
  }
`;
