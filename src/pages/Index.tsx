import Navigation from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-bengali-display literary-gradient-text mb-6">
              চতুষ্কোণ
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-bengali mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              শব্দের চতুষ্কোণ, যেখানে বেঁচে থাকে সাহিত্য।
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in" style={{ animationDelay: '0.4s' }}>
              <button className="literary-button bg-accent text-accent-foreground hover:bg-accent/90 font-bengali text-lg">
                সাহিত্য পড়ুন
              </button>
              <button className="literary-button bg-transparent border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground font-bengali text-lg">
                আরও জানুন
              </button>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-accent/10 rounded-full animate-bounce-gentle"></div>
        <div className="absolute bottom-20 right-16 w-16 h-16 bg-accent/20 rounded-full animate-bounce-gentle" style={{ animationDelay: '1s' }}></div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-bengali-display text-foreground mb-4">
              আমাদের সংগ্রহ
            </h2>
            <p className="text-lg text-muted-foreground font-bengali">
              বাংলা সাহিত্যের তিন মূল ধারা
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="literary-card text-center group animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-accent to-accent/70 rounded-full flex items-center justify-center">
                <span className="text-2xl text-white">📝</span>
              </div>
              <h3 className="text-xl font-semibold font-bengali-display text-foreground mb-3 group-hover:text-accent transition-colors">
                কবিতা
              </h3>
              <p className="text-muted-foreground font-bengali leading-relaxed">
                হৃদয়ের গভীর অনুভূতির প্রকাশ, ছন্দে ছন্দে বাঁধা জীবনের গান
              </p>
            </div>
            
            <div className="literary-card text-center group animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-accent to-accent/70 rounded-full flex items-center justify-center">
                <span className="text-2xl text-white">📚</span>
              </div>
              <h3 className="text-xl font-semibold font-bengali-display text-foreground mb-3 group-hover:text-accent transition-colors">
                গল্প
              </h3>
              <p className="text-muted-foreground font-bengali leading-relaxed">
                জীবনের নানা অধ্যায়ের কাহিনী, মানুষের আনন্দ-বেদনার চিত্র
              </p>
            </div>
            
            <div className="literary-card text-center group animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-accent to-accent/70 rounded-full flex items-center justify-center">
                <span className="text-2xl text-white">✍️</span>
              </div>
              <h3 className="text-xl font-semibold font-bengali-display text-foreground mb-3 group-hover:text-accent transition-colors">
                প্রবন্ধ
              </h3>
              <p className="text-muted-foreground font-bengali leading-relaxed">
                চিন্তা ও বিশ্লেষণের জগৎ, জ্ঞানের আলোয় উদ্ভাসিত মনন
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <blockquote className="animate-fade-in">
            <p className="text-2xl md:text-3xl font-bengali text-foreground/80 leading-relaxed mb-6">
              "সাহিত্য মানুষের হৃদয়ের দর্পণ, যেখানে প্রতিফলিত হয় জীবনের সত্য।"
            </p>
            <footer className="text-lg text-muted-foreground font-bengali">
              — রবীন্দ্রনাথ ঠাকুর
            </footer>
          </blockquote>
        </div>
      </section>
    </div>
  );
};

export default Index;
