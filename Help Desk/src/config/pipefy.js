export default function (body) {
    return {
        method: 'POST',
        url: 'https://app.pipefy.com/queries',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '
        },
        body: body
      }
}