export default function response({
  success = true,
  status = 200,
  message = "",
  data = null,
  error = null,
}) {
  return ({
    success,
    status,
    message,
    data,
    error,
  });
}
