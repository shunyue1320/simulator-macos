const terminal = [
  {
    id: "about",
    title: "about",
    type: "folder",
    children: [
      {
        id: "about-contact",
        title: "index.txt",
        type: "file",
        content: (
          <ul className="list-disc ml-6">
            <li>
              Email:{" "}
              <a
                className="text-blue-300"
                href="mailto:tsunyue1320@gmail.com"
                target="_blank"
                rel="noreferrer"
              >
                tsunyue1320@gmail.com
              </a>{" "}
              /{" "}
              <a
                className="text-blue-300"
                href="mailto:guojianbo6026@136.com"
                target="_blank"
                rel="noreferrer"
              >
                guojianbo6026@136.com
              </a>
            </li>
            <li>
              Github:{" "}
              <a
                className="text-blue-300"
                href="https://github.com/shunyue1320"
                target="_blank"
                rel="noreferrer"
              >
                https://github.com/shunyue1320
              </a>
            </li>
            <li>
              Linkedin:{" "}
              <a
                className="text-blue-300"
                href="https://www.linkedin.com/in/%E5%81%A5%E6%B3%A2-%E9%83%AD-24192a1bb"
                target="_blank"
                rel="noreferrer"
              >
                https://www.linkedin.com/in/%E5%81%A5%E6%B3%A2-%E9%83%AD-24192a1bb
              </a>
            </li>
            <li>
              Blog:{" "}
              <a
                className="text-blue-300"
                href="https://www.guojianbo.top"
                target="_blank"
                rel="noreferrer"
              >
                https://www.guojianbo.top
              </a>
            </li>
            <li>
              知乎:{" "}
              <a
                className="text-blue-300"
                href="https://www.zhihu.com/people/shun-yue-45"
                target="_blank"
                rel="noreferrer"
              >
                https://www.zhihu.com/people/shun-yue-45
              </a>
            </li>
          </ul>
        )
      }
    ]
  },
  {
    id: "about-dream",
    title: "demo.cpp",
    type: "file",
    content: (
      <div className="py-1">
        <div>
          <span className="text-yellow-400">while</span>(
          <span className="text-blue-400">sleeping</span>) <span>{"{"}</span>
        </div>
        <div>
          <span className="text-blue-400 ml-9">money</span>
          <span className="text-yellow-400">++</span>;
        </div>
        <div>
          <span>{"}"}</span>
        </div>
      </div>
    )
  }
];

export default terminal;
