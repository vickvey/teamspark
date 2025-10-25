export default function Footer() {
  return (
    <footer className="w-full h-96 rounded-t-[3rem] border-t-2">
      <div className="max-w-5xl flex flex-col gap-8 items-center mx-auto mt-14">
        <h4 className="text-2xl font-bold text-center">
          Made with love in NextJS.
        </h4>
        <div className="flex flex-col max-w-sm text-lg items-center font-bold">
          <p>Copyright 2025 Team Spark</p>
          <p>All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
