import Navigation from "@/components/Navigation";

const Stories = () => {
  const stories = [
    {
      id: 1,
      title: "হারানো দিন",
      author: "শরৎচন্দ্র চট্টোপাধ্যায়",
      preview: "গ্রামের মেঠো পথে হেঁটে যাচ্ছিলাম। হঠাৎ দেখি একটা পুরানো বাড়ি। মনে হলো যেন এ বাড়ি চিনি...",
      readTime: "১৫ মিনিট"
    },
    {
      id: 2,
      title: "নদীর গল্প",
      author: "মানিক বন্দ্যোপাধ্যায়",
      preview: "পদ্মা নদীর তীরে দাঁড়িয়ে ভাবছিলাম জীবনের কথা। কত মানুষের স্বপ্ন ভেসে গেছে এই জলে...",
      readTime: "২০ মিনিট"
    },
    {
      id: 3,
      title: "ছোট গল্প",
      author: "রবীন্দ্রনাথ ঠাকুর",
      preview: "ছোট্ট একটা মেয়ে রোজ স্কুল যাওয়ার পথে দেখতো একটা বৃদ্ধ লোক বসে আছে রাস্তার পাশে...",
      readTime: "১০ মিনিট"
    },
    {
      id: 4,
      title: "সন্ধ্যার আলো",
      author: "বিভূতিভূষণ বন্দ্যোপাধ্যায়",
      preview: "সন্ধ্যার মিষ্টি আলোয় গ্রামটা যেন স্বর্গের মতো লাগছিল। দূরে কোথাও একটা বাঁশি বাজছে...",
      readTime: "২৫ মিনিট"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold font-bengali-display literary-gradient-text mb-4">
            গল্প
          </h1>
          <p className="text-xl text-muted-foreground font-bengali">
            জীবনের নানা অধ্যায়ের কাহিনী
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {stories.map((story, index) => (
            <article 
              key={story.id}
              className="literary-card hover:border-accent/30 animate-slide-up group"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-2xl font-semibold font-bengali-display text-foreground group-hover:text-accent transition-colors">
                  {story.title}
                </h2>
                <span className="text-sm text-muted-foreground font-bengali bg-muted px-2 py-1 rounded">
                  {story.readTime}
                </span>
              </div>
              
              <p className="text-sm text-muted-foreground font-bengali mb-4">
                — {story.author}
              </p>
              
              <div className="prose-bengali mb-6">
                <p className="text-foreground/80 leading-relaxed">
                  {story.preview}
                </p>
              </div>
              
              <button className="literary-button bg-accent text-accent-foreground hover:bg-accent/90 w-full font-bengali">
                সম্পূর্ণ গল্প পড়ুন
              </button>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Stories;