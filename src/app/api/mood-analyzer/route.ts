export default function GET(text: string) {
  // Do some processing
  return Response.json({
    mood: {
      happy: 0.1,
      sad: 0.5,
      angry: 0.5,
      anxious: 0.7,
    },
  });
}
