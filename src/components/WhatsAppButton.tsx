const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/918590589890?text=Hi%20NAZ%20Architects%2C%20I%20am%20interested%20in%20your%20design%20and%20consulting%20services.%20Can%20we%20discuss%20a%20project%3F"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[hsl(142,70%,45%)] shadow-lg hover:bg-[hsl(142,70%,40%)] transition-all duration-300 hover:scale-110 animate-pulse-glow"
    >
      <svg viewBox="0 0 32 32" className="w-7 h-7 fill-[hsl(0,0%,100%)]">
        <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958A15.91 15.91 0 0016.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.335 22.594c-.39 1.1-1.932 2.014-3.164 2.28-.844.18-1.946.324-5.66-1.216-4.752-1.97-7.81-6.79-8.044-7.104-.226-.314-1.9-2.53-1.9-4.828s1.2-3.428 1.628-3.898c.39-.428.916-.535 1.198-.535.146 0 .276.008.394.014.428.018.642.042.924.714.352.84 1.212 2.952 1.318 3.168.108.216.18.468.036.75-.136.29-.204.468-.408.72-.204.252-.43.562-.612.754-.204.216-.416.45-.18.884.238.428 1.058 1.746 2.272 2.828 1.562 1.394 2.878 1.826 3.286 2.028.408.204.648.17.886-.1.246-.278 1.048-1.218 1.328-1.636.274-.418.554-.35.932-.21.384.136 2.43 1.146 2.846 1.354.418.21.694.314.796.49.1.174.1 1.012-.29 2.112z" />
      </svg>
    </a>
  );
};

export default WhatsAppButton;
