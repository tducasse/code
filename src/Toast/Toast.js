import PropTypes from "prop-types";

const Toast = ({ type, text }) => {
  const color = {
    success: "green",
    warning: "yellow",
    error: "red",
    info: "blue",
  }[type];

  const header = {
    success: "Success",
    warning: "Warning",
    error: "Error",
    info: "Info",
  }[type];

  const Icon = {
    success: () => (
      <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
    ),
    warning: () => (
      <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z" />
    ),
    info: () => (
      <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z" />
    ),
    error: () => (
      <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
    ),
  }[type];

  return (
    <div className="absolute z-10 bottom-0 right-0 flex mx-auto w-full max-w-sm dark:bg-gray-800 bg-white rounded-lg shadow-md overflow-hidden">
      <div className={`flex items-center justify-center w-12 bg-${color}-500`}>
        <svg
          className="w-6 h-6 text-white fill-current"
          viewBox="0 0 40 40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Icon />
        </svg>
      </div>

      <div className="-mx-3 px-4 py-2">
        <div className="mx-3">
          <span
            className={`dark:text-${color}-400 text-${color}-500 font-semibold`}
          >
            {header}
          </span>
          <p className="dark:text-gray-200 text-gray-600 text-sm">{text}</p>
        </div>
      </div>
    </div>
  );
};

Toast.propTypes = {
  type: PropTypes.oneOf(["success", "warning", "error", "info"]),
  text: PropTypes.string,
};

Toast.defaultProps = {
  type: "success",
  text: "Success",
};

export default Toast;
