import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { supabase } from "@/integrations/supabase/client";

interface Content {
  id: string;
  title: string;
  body: string;
  category: 'কবিতা' | 'গল্প' | 'প্রবন্ধ';
  created_at: string;
}

const Stories = () => {
  const [stories, setStories] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const { data, error } = await supabase
        .from('contents')
        .select('*')
        .eq('category', 'গল্প')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setStories(data || []);
    } catch (error) {
      console.error('Error fetching stories:', error);
    } finally {
      setLoading(false);
    }
  };

  const getReadingTime = (text: string) => {
    const wordsPerMinute = 200;
    const wordCount = text.split(' ').length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} মিনিট`;
  };

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

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
            <p className="font-bengali text-muted-foreground">লোড হচ্ছে...</p>
          </div>
        ) : stories.length > 0 ? (
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
                    {getReadingTime(story.body)}
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground font-bengali mb-4">
                  {new Date(story.created_at).toLocaleDateString('bn-BD')}
                </p>
                
                <div className="prose-bengali mb-6">
                  <p className="text-foreground/80 leading-relaxed">
                    {story.body.substring(0, 200)}
                    {story.body.length > 200 && '...'}
                  </p>
                </div>
                
                <button className="literary-button bg-accent text-accent-foreground hover:bg-accent/90 w-full font-bengali">
                  সম্পূর্ণ গল্প পড়ুন
                </button>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="font-bengali text-muted-foreground text-lg">এখনো কোনো গল্প যোগ করা হয়নি।</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Stories;