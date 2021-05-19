import React, { useState } from 'react'
import Window from '../components/Window'

function NotepadContent() {
  return (
    <div className="w-full h-full bg-gray-100 text-gray-700 overflow-scroll px-8 py-6">
      <div className="charapter">
        <div className="font-medium text-gray-800 text-lg heading">About Me</div>
        <div className="paragraph mt-4">
          Hey there! I'm Jianbo Guo, <s>a dragon lost in human world</s> now
          an intern at CETC and a research assistant at Peking University.
          Before that, I got my bachelor's degree in Software Engineering at
          Tongji University. I'm trying to find a balance between research and engineering.
        </div>
        <div className="paragraph mt-4">
          Research-wise, I'm mainly working on topics related to exploring the
          capability of machines to develop intelligent behavior upon what they
          have learned, like meta-learning and continual learning.
        </div>
      </div>

      <div className="charapter mt-8">
        <div className="font-medium text-gray-800 text-lg heading">Contact</div>
        <div className="paragraph mt-4">
          Reach me at:
          <ul className="mt-2 list-disc list-inside">
            <li>
              Email: <a className="text-blue-500" href="mailto:tsunyue1320@gmail.com">
                tsunyue1320@gmail.com
              </a> / <a className="text-blue-500" href="mailto:guojianbo6026@163.com">
                guojianbo6026@163.com
              </a>
            </li>
            <li>Github: <a className="text-blue-500" href="https://github.com/shunyue1320" target="_blank" rel="noreferrer">shunyue1320</a></li>
            <li>Blog: <a className="text-blue-500" href="https://guojianbo.top" target="_blank" rel="noreferrer">guojianbo.top</a></li>
            <li>Linkedin: <a className="text-blue-500" href="https://www.linkedin.com/in/jianbo-guo-24192a1bb/" target="_blank" rel="noreferrer">Jianbo Guo</a></li>
          </ul>
        </div>
      </div>

      <div className="charapter mt-8">
        <div className="font-medium text-gray-800 text-lg heading">Résumé</div>
        <div className="paragraph mt-4">
          My résumé can be found <a className="text-blue-500" href="https://renovamen.ink/files/cv/brief/en.pdf" target="_blank" rel="noreferrer">here</a>.
        </div>
      </div>
    </div>
  )
}

export default function Notepad({ show, setShow, active, z }) {
  const [ textMax, setTextMax ] = useState(false)
  return (
    <Window 
      content={<NotepadContent />}
      title="Notepad"
      show={show}
      setShow={setShow}
      max={textMax}
      setMax={setTextMax}
      active={active}
      z={z}
    />
  )
}