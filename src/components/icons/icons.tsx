import { type LucideIcon, type LucideProps } from "lucide-react";

export type Icon = LucideIcon;

export const Icons = {
  logo: (props: LucideProps) => (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10"></circle>
    </svg>
  ),
  nextjs: (props: LucideProps) => (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>{"Next.js"}</title>
      <path
        fill="currentColor"
        d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z"
      />
    </svg>
  ),
  react: (props: LucideProps) => (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"
        fill="#61DAFB"
      />
    </svg>
  ),
  typescript: (props: LucideProps) => (
    <svg
      width="500"
      height="500"
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="500" height="500" fill="black" />
      <rect x="69" y="121" width="86.9879" height="259" fill="white" />
      <rect x="337.575" y="121" width="92.4247" height="259" fill="white" />
      <rect
        x="427.282"
        y="121"
        width="83.4555"
        height="174.52"
        transform="rotate(90 427.282 121)"
        fill="white"
      />
      <rect
        x="430"
        y="296.544"
        width="83.4555"
        height="177.238"
        transform="rotate(90 430 296.544)"
        fill="white"
      />
      <rect
        x="252.762"
        y="204.455"
        width="92.0888"
        height="96.7741"
        transform="rotate(90 252.762 204.455)"
        fill="white"
      />
    </svg>
  ),
  shadcn: (props: LucideProps) => (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>{"shadcn/ui"}</title>
      <path
        fill="currentColor"
        d="M22.219 11.784 11.784 22.219c-.407.407-.407 1.068 0 1.476.407.407 1.068.407 1.476 0L23.695 13.26c.407-.408.407-1.069 0-1.476-.408-.407-1.069-.407-1.476 0ZM20.132.305.305 20.132c-.407.407-.407 1.068 0 1.476.408.407 1.069.407 1.476 0L21.608 1.781c.407-.407.407-1.068 0-1.476-.408-.407-1.069-.407-1.476 0Z"
      />
    </svg>
  ),
  radix: (props: LucideProps) => (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>{"Radix UI"}</title>
      <path
        fill="currentColor"
        d="M11.52 24a7.68 7.68 0 0 1-7.68-7.68 7.68 7.68 0 0 1 7.68-7.68V24Zm0-24v7.68H3.84V0h7.68Zm4.8 7.68a3.84 3.84 0 1 1 0-7.68 3.84 3.84 0 0 1 0 7.68Z"
      />
    </svg>
  ),
  tailwind: (props: LucideProps) => (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>{"Tailwind CSS"}</title>
      <path
        fill="#06B6D4"
        d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"
      />
    </svg>
  ),
  lucide: (props: LucideProps) => (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>{"Lucide"}</title>
      <path
        fill="#F56565"
        d="M18.483 1.123a1.09 1.09 0 0 0-.752.362 1.09 1.09 0 0 0 .088 1.54 11.956 11.956 0 0 1 4 8.946 7.62 7.62 0 0 1-7.637 7.636 7.62 7.62 0 0 1-7.637-7.636 3.255 3.255 0 0 1 3.273-3.273c1.82 0 3.273 1.45 3.273 3.273a1.09 1.09 0 0 0 1.09 1.09 1.09 1.09 0 0 0 1.092-1.09c0-3-2.455-5.455-5.455-5.455s-5.454 2.455-5.454 5.455c0 5.408 4.408 9.818 9.818 9.818 5.41 0 9.818-4.41 9.818-9.818A14.16 14.16 0 0 0 19.272 1.4a1.09 1.09 0 0 0-.789-.277ZM9.818 2.15C4.408 2.151 0 6.561 0 11.97a14.16 14.16 0 0 0 4.8 10.637 1.09 1.09 0 0 0 1.54-.096 1.09 1.09 0 0 0-.095-1.54 11.957 11.957 0 0 1-4.063-9 7.62 7.62 0 0 1 7.636-7.637 7.62 7.62 0 0 1 7.637 7.636 3.256 3.256 0 0 1-3.273 3.273 3.256 3.256 0 0 1-3.273-3.273 1.09 1.09 0 0 0-1.09-1.09 1.09 1.09 0 0 0-1.092 1.09c0 3 2.455 5.455 5.455 5.455s5.454-2.455 5.454-5.455c0-5.408-4.408-9.818-9.818-9.818z"
      />
    </svg>
  ),
  betterAuthUi: (props: LucideProps) => (
    <svg
      fill="currentColor"
      height="45"
      viewBox="0 0 60 45"
      width="45"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M0 0H15V45H0V0ZM45 0H60V45H45V0ZM20 0H40V15H20V0ZM20 30H40V45H20V30Z"
        fillRule="evenodd"
      ></path>
    </svg>
  ),
  reactHookForm: (props: LucideProps) => (
    <svg
      {...props}
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{"React Hook Form"}</title>
      <path
        fill="#EC5990"
        d="M10.7754 17.3477H5.8065a.2815.2815 0 1 0 0 .563h4.9689a.2815.2815 0 1 0 0-.563zm7.3195 0h-4.9688a.2815.2815 0 1 0 0 .563h4.9688a.2815.2815 0 0 0 0-.563zm-7.3336-6.475H5.8065a.2815.2815 0 1 0 0 .563h4.9548a.2815.2815 0 1 0 0-.563zm7.3195 0h-4.9547a.2815.2815 0 1 0 0 .563h4.9547a.2815.2815 0 0 0 0-.563zm.5518-9.2001h-4.341a2.4042 2.4042 0 0 0-4.5804 0H5.3674c-1.7103 0-3.0968 1.3864-3.0968 3.0967v16.134C2.2706 22.6135 3.6571 24 5.3674 24h13.2652c1.7103 0 3.0968-1.3865 3.0968-3.0967V4.7693c0-1.7103-1.3865-3.0967-3.0968-3.0967zm-8.7046.563a.2815.2815 0 0 0 .2815-.2224 1.8411 1.8411 0 0 1 3.5979 0 .2815.2815 0 0 0 .2815.2224h1.5146v1.844a.8446.8446 0 0 1-.8446.8446H9.2552a.8446.8446 0 0 1-.8446-.8446v-1.844Zm11.2383 18.6677c0 1.3993-1.1344 2.5337-2.5337 2.5337H5.3674c-1.3993 0-2.5337-1.1344-2.5337-2.5337V4.7693c0-1.3993 1.1344-2.5337 2.5337-2.5337h2.4802v1.844c0 .7774.6302 1.4076 1.4076 1.4076h5.4896c.7774 0 1.4076-.6302 1.4076-1.4076v-1.844h2.4802c1.3993 0 2.5337 1.1344 2.5337 2.5337z"
      />
    </svg>
  ),
  zod: (props: LucideProps) => (
    <svg
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xlinkHref="http://www.w3.org/1999/xlink"
      baseProfile="tiny"
      version="1.2"
      viewBox="0 0 480 480"
      {...props}
    >
      <image
        width={466}
        height={384}
        transform="translate(7 48)"
        xlinkHref="data:image/png;base64,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"
      />
      <image
        width={305}
        height={235}
        transform="translate(114 108)"
        xlinkHref="data:image/png;base64,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"
      />
      <path
        d="M393.09,106.2l23.5,65.3H63.19l23.81-65.4c4.26-11.69,15.32-19.5,27.76-19.59h250.08c12.64-.1,23.97,7.8,28.25,19.7Z"
        fill="#fff"
        fillRule="evenodd"
      />
      <image
        width={252}
        height={104}
        transform="translate(114 278)"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPwAAABoCAYAAADVXJ0yAAAACXBIWXMAAAsSAAALEgHS3X78AAAFVklEQVR4nO3dUattUxiH8ffZ+QIu3MiFJJILkUQuSCIpkbhQTiJSRESJCCWEJISS0klJSpKUJB8M28VZM+uss9fac64153zHGPP5leyz99pr/ktPo7NH5+D4+Pg4tFT/DvjneM+vb35+yK93ffz32udOet2Y/z7tc30/Xt8ZEfHP2n+HOODzvV93BBCSmgf8dbT6wOilhgF/RkQcrX3C6KUGdbFHrAW/+oLRSw0B/lj/9dEJLzB6qQGbsUdEXLTlhfjTe6lOwO/bvnbBCb/2TXjaS3UBftv19a3Br72B0UsVOC32iB7Br97I6KWCAb/2eV2v4FdvaPRSgfrGHjEg+NUbG71UEOCXIa8fFPzqAUYvFWBo7BF7BL96kNFLiYCf9/m+E+/hez6QiAjv66X5AD8d8v17nfAbAzztpRkcGnvECMGvhhi9NCHgxzHeZ5TgI4xemspYsUeMGHyE0UtjA34Y8/1GDT7C6KWxjB17xATBRxi9dCjg+yned5LgI/zTdtK+poo94oB7+L78s/VSP8B3Uz9jshN+nSe9tBtwdo7nzBJ8hNFL28wVe8SMwUcYvbQJ+HbO580afITRS525Y49ICD7C6CXgm4znpgQf4bWdlisr9ojE4DtGryUBvs58/uT38H14V6/WAV9lb4go4ITveNKrVcCX2Rs6xQQfYfRqD/BF9oZ1RQUfYfRqB/B59oZNxQUfYfSqH/BZ9oaTFBl8hNd2qhfwafaGbYoNvmP0qgnwSfaGXYq4ljuN13YqHfBx9oY+ij/hO570KhXwUfaGvqoJPsLoVR7gw+wNQ1QVfITRqxzAB9kbhqou+AijVz7g/ewN+6gy+Aiv7ZQHeC97w76qDb5j9JoT8G72hkNUH3yE0WsewDvZGw5VxT18H97VayrA29kbxtLECd/xpNfYgLeyN4ypqeAjjF7jAd7M3jC25oKP8Cf4OhzwRvaGKTQZfMfotQ/g9ewNU2k6+Aij1zDAa9kbptR88BFGr36AV7M3TG0RwUcYvXYDXsneMIdm7uH78K5em4CXszfMaTEnfMeTXh3gpewNc1tc8BFe2ykCeDF7Q4ZFBt8x+mUCXsjekGXRwUcY/dIAz2dvyLT44COMfimA57I3ZDP4FaNvG/Bs9oYSGPwao28T8Ez2hlIs6h6+D+/q2wE8nb2hNJ7wJ/Darn7AU9kbSmTwOxh9nYAnszeUyuBPYfR1AZ7I3lAyg+/B6OsAPJ69oXQG35PRlw14LHtDDQx+AKMvE3Ame0MtDH4goy8L8Gj2hpp4D7+HLnrv6/MAj2RvqJEn/AE87XMAD2dvqJXBH8jo5wU8lL2hZgY/AqOfB/Bg9obaGfxIjH5awAPZG1pg8CMy+mkA92dvaIXBj8zoxwXcl72hJV7LTcBru8MB92ZvaJEn/IQ87fcD3JO9oVUGPzGjHwa4O3tDywx+BkbfD3BX9obWGfxMjH434M7sDUtg8DMy+pMBd2RvWAqDn5nRnw+4PXvDkhh8Av+SzHOA27I3LI338ImW+ldiA7dmb1gqT/hkSzvpgVuyNyyZwRdgKdEDN2dvWDqDL0Tr0QM3ZW+QwRel1eiBG7M36ByDL0xrP8EHbsjeoP8ZfKFaiB64PnuDzmfwBas5euC67A26kPfwhavtrh64NnuDtvOEr0AtJz1wTfYG7WbwlSg9euDq7A06ncFXpNTogauyN6gfg69Madd2wJXZG9SfwVeqhOiBK7I3aBiDr1hm9MDlWc/W/ryWq9zc13bAZXM9S+PzhG/AXL+vBy6d+hmalid8Q6b4H2AAl4z1Xspn8A1aP+33jR+4eLxFkqTZ/QcZl97+F1CzgwAAAABJRU5ErkJggg=="
      />
    </svg>
  ),
  triplit: (props: LucideProps) => (
    <svg
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      baseProfile="tiny"
      version="1.2"
      viewBox="0 0 48 40"
      {...props}
    >
      <path
        fill="currentColor"
        d="M36.16,17.8c.83,1.01,17,3.35,9.52,9.48-6.18,5.07-23.22,5.14-30.96,4.26-3.24-.37-14.1-2.88-14.46-6.71-.51-4.98,10.09-5.68,11.21-7.04.57-.69.75-3.52,2.18-5.52,4.85-6.81,16.9-6.35,21.05.9.82,1.42.92,3.97,1.46,4.62ZM20.33,10.86c-3.38.78-7.7,6.17-4.65,9.18,2.57,2.53,14.12,2.83,16.32.06,3.14-7.58-5.35-10.69-11.67-9.24Z"
      />
    </svg>
  ),
  gitHub: (props: LucideProps) => (
    <svg {...props} viewBox="0 0 24 24">
      <title>{"GitHub"}</title>
      <path
        fill="currentColor"
        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
      />
    </svg>
  ),
  planningCenter: (props: LucideProps) => (
    <svg {...props} viewBox="0 0 42 43">
      <path
        fill="currentColor"
        d="M27.7,17.29c.13-.04.26.06.26.19v6.33c0,.09-.06.17-.14.19l-6.54,1.93c-.19.05-.38.05-.57,0l-6.51-1.93c-.08-.03-.14-.1-.14-.19v-6.33c0-.13.13-.23.26-.19l5.49,1.63c.79.23,1.63.23,2.41,0l5.49-1.63Z"
      />
      <path
        fill="currentColor"
        d="M23.58,1.35c-1.69-.46-3.47-.46-5.17,0l-13.23,3.6c-3.06.83-5.19,3.65-5.19,6.88v20.36c0,3.22,2.13,6.04,5.19,6.88l13.23,3.6c1.69.46,3.47.46,5.17,0l13.23-3.6c3.06-.83,5.19-3.65,5.19-6.88V11.82c0-3.22-2.13-6.04-5.19-6.88l-13.23-3.6ZM14.3,28.12c-.13-.04-.26.06-.26.19v4.38c0,.43-.4.74-.82.63l-2.75-.73c-.28-.08-.48-.33-.48-.63V15.45c0-1.75,1.76-3,3.49-2.49l7.21,2.14c.19.06.38.06.57,0l7.24-2.14c1.73-.51,3.49.74,3.49,2.49v9.47c0,1.14-.77,2.15-1.9,2.49l-7.89,2.34c-.79.23-1.63.23-2.41,0l-5.49-1.63Z"
      />
    </svg>
  ),

  pnpm: (props: LucideProps) => (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>{"pnpm"}</title>
      <path
        fill="#F69220"
        d="M0 0v7.5h7.5V0zm8.25 0v7.5h7.498V0zm8.25 0v7.5H24V0zM8.25 8.25v7.5h7.498v-7.5zm8.25 0v7.5H24v-7.5zM0 16.5V24h7.5v-7.5zm8.25 0V24h7.498v-7.5zm8.25 0V24H24v-7.5z"
      />
    </svg>
  ),
};

export default Icons;
