import Navigation from "@/components/Navigation";

const Essays = () => {
  const essays = [
    {
      id: 1,
      title: "সাহিত্যের ভবিষ্যৎ",
      author: "হুমায়ূন আহমেদ",
      preview: "আধুনিক যুগে সাহিত্যের ভূমিকা কী? ডিজিটাল মাধ্যমে সাহিত্য কীভাবে পৌঁছাবে মানুষের হৃদয়ে? এই প্রবন্ধে আলোচনা করা হয়েছে...",
      category: "সাহিত্য সমালোচনা",
      publishDate: "১৫ মার্চ, ২০২৪"
    },
    {
      id: 2,
      title: "বাংলা ভাষার সৌন্দর্য",
      author: "আনিসুজ্জামান",
      preview: "বাংলা ভাষার রয়েছে অপূর্ব মাধুর্য। এই ভাষার শব্দচয়ন, ছন্দ, এবং অভিব্যক্তির ক্ষমতা অসাধারণ। কীভাবে এই ভাষা গড়ে উঠেছে...",
      category: "ভাষাতত্ত্ব",
      publishDate: "৮ ফেব্রুয়ারি, ২০২৪"
    },
    {
      id: 3,
      title: "আধুনিক কবিতার ধারা",
      author: "শামসুর রাহমান",
      preview: "আধুনিক বাংলা কবিতায় এসেছে নতুন চেতনা, নতুন শব্দপ্রয়োগ। রবীন্দ্র-পরবর্তী কবিতার জগতে কী পরিবর্তন এসেছে...",
      category: "কবিতা বিশ্লেষণ",
      publishDate: "২২ জানুয়ারি, ২০২৪"
    },
    {
      id: 4,
      title: "গ্রামীণ জীবন ও সাহিত্য",
      author: "সৈয়দ ওয়ালীউল্লাহ",
      preview: "বাংলা সাহিত্যে গ্রামীণ জীবনের প্রতিফলন কীভাবে ঘটেছে? মানিক বন্দ্যোপাধ্যায় থেকে শুরু করে আধুনিক লেখকদের রচনায়...",
      category: "সামাজিক প্রবন্ধ",
      publishDate: "৩ ডিসেম্বর, ২০২৩"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold font-bengali-display literary-gradient-text mb-4">
            প্রবন্ধ
          </h1>
          <p className="text-xl text-muted-foreground font-bengali">
            চিন্তা ও বিশ্লেষণের জগৎ
          </p>
        </div>

        <div className="space-y-8">
          {essays.map((essay, index) => (
            <article 
              key={essay.id}
              className="literary-card hover:border-accent/30 animate-slide-up group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-semibold font-bengali-display text-foreground mb-2 group-hover:text-accent transition-colors">
                    {essay.title}
                  </h2>
                  <p className="text-sm text-muted-foreground font-bengali">
                    — {essay.author}
                  </p>
                </div>
                <div className="flex flex-col md:items-end mt-2 md:mt-0 space-y-1">
                  <span className="text-xs text-accent font-bengali bg-accent/10 px-2 py-1 rounded">
                    {essay.category}
                  </span>
                  <span className="text-xs text-muted-foreground font-bengali">
                    {essay.publishDate}
                  </span>
                </div>
              </div>
              
              <div className="prose-bengali mb-6">
                <p className="text-foreground/80 leading-relaxed text-base md:text-lg">
                  {essay.preview}
                </p>
              </div>
              
              <div className="flex justify-between items-center">
                <button className="literary-button bg-accent text-accent-foreground hover:bg-accent/90 font-bengali">
                  সম্পূর্ণ প্রবন্ধ পড়ুন
                </button>
                <button className="text-muted-foreground hover:text-accent transition-colors font-bengali text-sm">
                  শেয়ার করুন
                </button>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Essays;