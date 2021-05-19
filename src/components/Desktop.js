import React, { useState } from 'react'

import MenuBar from './MenuBar'
import ControlCenterMenu from './ControlCenterMenu'
import FaceTime from '../apps/FaceTime'
import Terminal from "../apps/Terminal";

export default function Desktop() {
  const [ showControlCenter, setShowControlCenter ] = useState(fasle) // 显示控制中心

  const [bioShow, setBioShow] = useState(true)
  const [faceTimeShow, setFaceTimeShow] = useState(false)
  const [safariShow, setSafariShow] = useState(false)
  const [cmdShow, setCmdShow] = useState(false)
  const [currentTitle, setCurrentTitle] = useState('Playground')

  const [bioZ, setBioZ] = useState(2)
  const [faceTimeZ, setFaceTimeZ] = useState(2)
  const [safariZ, setSafariZ] = useState(2)
  const [cmdZ, setCmdZ] = useState(2)
  const [maxZ, setMaxZ] = useState(2)

  const setFunc = {
    Safari: {
      setZ: setSafariZ,
      setShow: safariShow
    },
    Notepad: {
      setZ: setBioZ,
      setShow: setBioShow
    },
    FaceTime: {
      setZ: setFaceTimeZ,
      setShow: setFaceTimeShow
    },
    Terminal: {
      setZ: setCmdZ,
      setShow: setCmdShow
    }
  }

  const openWindow = (title) => {
    setCurrentTitle(title)
    const setShow = setFunc[title].setShow
    const setZ = setFunc[title].setZ
    setShow(true)
    setZ(maxZ + 1)
    setMaxZ(maxZ + 1)
  }

  return (
    <div
      className="w-screen h-screen overflow-hidden bg-center bg-cover"
      style={{ backgroundImage: 'url(img/ui/wallpaper.jpg)' }}
    >
      <MenuBar
        title={currentTitle}
        showControlCenter={showControlCenter}
        setShowControlCenter={setShowControlCenter}
      />

      {showControlCenter && <ControlCenterMenu />}

      <FaceTime show={faceTimeShow} setShow={setFaceTimeShow} active={openWindow} z={faceTimeZ} />
      <Terminal show={cmdShow} setShow={setCmdShow} active={openWindow} z={bioZ} />

    </div>
  )
}