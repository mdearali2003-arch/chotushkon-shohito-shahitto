import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { supabase } from "@/integrations/supabase/client";

interface Content {
  id: string;
  title: string;
  body: string;
  category: 'কবিতা' | 'গল্প' | 'প্রবন্ধ';
  created_at: string;
}

const Index = () => {
  const [recentWorks, setRecentWorks] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentWorks();
  }, []);

  const fetchRecentWorks = async () => {
    try {
      const { data, error } = await supabase
        .from('contents')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) throw error;
      setRecentWorks(data || []);
    } catch (error) {
      console.error('Error fetching recent works:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryLink = (category: string) => {
    switch (category) {
      case 'কবিতা': return '/poetry';
      case 'গল্প': return '/stories';
      case 'প্রবন্ধ': return '/essays';
      default: return '/';
    }
  };

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
              <Link to="/poetry">
                <button className="literary-button bg-accent text-accent-foreground hover:bg-accent/90 font-bengali text-lg">
                  কবিতা পড়ুন
                </button>
              </Link>
              <Link to="/stories">
                <button className="literary-button bg-transparent border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground font-bengali text-lg">
                  গল্প পড়ুন
                </button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-accent/10 rounded-full animate-bounce-gentle"></div>
        <div className="absolute bottom-20 right-16 w-16 h-16 bg-accent/20 rounded-full animate-bounce-gentle" style={{ animationDelay: '1s' }}></div>
      </section>

      {/* Recent Works Section */}
      {recentWorks.length > 0 && (
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-bengali-display literary-gradient-text mb-4">
                সাম্প্রতিক রচনা
              </h2>
              <p className="text-lg text-muted-foreground font-bengali">
                আমাদের সংগ্রহের নতুন সংযোজন
              </p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
                <p className="font-bengali text-muted-foreground">লোড হচ্ছে...</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentWorks.map((work, index) => (
                  <Link 
                    key={work.id}
                    to={getCategoryLink(work.category)}
                    className="literary-card animate-slide-up group cursor-pointer hover:border-accent/30 block"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-sm font-bengali bg-accent/10 text-accent px-3 py-1 rounded-full">
                        {work.category}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold font-bengali-display text-foreground mb-2 group-hover:text-accent transition-colors">
                      {work.title}
                    </h3>
                    
                    <p className="text-foreground/80 font-bengali leading-relaxed mb-4 line-clamp-3">
                      {work.body.substring(0, 150)}...
                    </p>
                    
                    <span className="text-accent hover:text-accent/80 font-bengali font-medium transition-colors hover:underline">
                      সম্পূর্ণ পড়ুন →
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

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
            <Link to="/poetry" className="literary-card text-center group animate-slide-up hover:border-accent/30 block" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-accent to-accent/70 rounded-full flex items-center justify-center">
                <span className="text-2xl text-white">📝</span>
              </div>
              <h3 className="text-xl font-semibold font-bengali-display text-foreground mb-3 group-hover:text-accent transition-colors">
                কবিতা
              </h3>
              <p className="text-muted-foreground font-bengali leading-relaxed">
                হৃদয়ের গভীর অনুভূতির প্রকাশ, ছন্দে ছন্দে বাঁধা জীবনের গান
              </p>
            </Link>
            
            <Link to="/stories" className="literary-card text-center group animate-slide-up hover:border-accent/30 block" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-accent to-accent/70 rounded-full flex items-center justify-center">
                <span className="text-2xl text-white">📚</span>
              </div>
              <h3 className="text-xl font-semibold font-bengali-display text-foreground mb-3 group-hover:text-accent transition-colors">
                গল্প
              </h3>
              <p className="text-muted-foreground font-bengali leading-relaxed">
                জীবনের নানা অধ্যায়ের কাহিনী, মানুষের আনন্দ-বেদনার চিত্র
              </p>
            </Link>
            
            <Link to="/essays" className="literary-card text-center group animate-slide-up hover:border-accent/30 block" style={{ animationDelay: '0.3s' }}>
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-accent to-accent/70 rounded-full flex items-center justify-center">
                <span className="text-2xl text-white">✍️</span>
              </div>
              <h3 className="text-xl font-semibold font-bengali-display text-foreground mb-3 group-hover:text-accent transition-colors">
                প্রবন্ধ
              </h3>
              <p className="text-muted-foreground font-bengali leading-relaxed">
                চিন্তা ও বিশ্লেষণের জগৎ, জ্ঞানের আলোয় উদ্ভাসিত মনন
              </p>
            </Link>
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
