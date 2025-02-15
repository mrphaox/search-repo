interface Props {
  message: string;
}

const ErrorMessage: React.FC<Props> = ({ message }) => (
  <div className="text-center text-red-400 font-semibold">{message}</div>
);

export default ErrorMessage;
