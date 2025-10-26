export default function Footer() {
  return (
    <footer className="w-full h-96 rounded-t-[3rem] border-t bg-background/80 border-border">
      <div className="max-w-5xl flex flex-col gap-8 items-center mx-auto mt-14 px-4 text-center">
        <h4 className="text-2xl font-bold text-foreground">
          Made with ❤️ in NextJS
        </h4>
        <div className="flex flex-col max-w-sm text-lg font-semibold text-foreground/80">
          <p>Copyright 2025 Team Spark</p>
          <p>All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
