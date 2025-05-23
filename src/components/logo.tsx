export const Logo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 400 400">
    <foreignObject
      width="100%"
      height="100%"
      x="0"
      y="0"
      externalResourcesRequired={true}>
      <div
        className="bg-transparent w-screen md:w-[350px] lg:w-[400px] xl:w-[600px] max-w-full md:h-[350px] lg:h-[400px] xl:h-[600px] aspect-square"
        style={{
          width: "400px",
          height: "400px",
          padding: "62px",
        }}>
        <div
          className="flex justify-center items-center shadow-xl w-full aspect-square overflow-hidden"
          style={{
            background:
              "linear-gradient(45deg, rgb(199, 123, 123) 0%, rgb(2, 1, 0) 100%)",
            borderRadius: "300px",
            width: "276px",
            height: "276px",
          }}>
          <span
            style={{
              transform: "matrix(0.866025, 0.5, -0.5, 0.866025, 0, 0)",
              display: "block",
              width: "405px",
              height: "405px",
            }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="405"
              height="405"
              viewBox="0 0 24 24"
              fill="rgb(45, 24, 24)"
              stroke="rgb(255, 255, 255)"
              strokeWidth="3.41"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-tally3"
              fillOpacity="0"
              style={{
                width: "405px",
                height: "405px",
                overflow: "hidden",
              }}>
              <path
                d="M4 4v16"
                style={{
                  fill: "rgb(45, 24, 24)",
                  fillOpacity: 0,
                  stroke: "rgb(255, 255, 255)",
                  strokeWidth: "3.41px",
                }}
              />
              <path
                d="M9 4v16"
                style={{
                  fill: "rgb(45, 24, 24)",
                  fillOpacity: 0,
                  stroke: "rgb(255, 255, 255)",
                  strokeWidth: "3.41px",
                }}
              />
              <path
                d="M14 4v16"
                style={{
                  fill: "rgb(45, 24, 24)",
                  fillOpacity: 0,
                  stroke: "rgb(255, 255, 255)",
                  strokeWidth: "3.41px",
                }}
              />
            </svg>
          </span>
        </div>
      </div>
    </foreignObject>
  </svg>
);
