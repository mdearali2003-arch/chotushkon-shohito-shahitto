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

const Poetry = () => {
  const [poems, setPoems] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPoems();
  }, []);

  const fetchPoems = async () => {
    try {
      const { data, error } = await supabase
        .from('contents')
        .select('*')
        .eq('category', 'কবিতা')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPoems(data || []);
    } catch (error) {
      console.error('Error fetching poems:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold font-bengali-display literary-gradient-text mb-4">
            কবিতা
          </h1>
          <p className="text-xl text-muted-foreground font-bengali">
            হৃদয়ের গভীর অনুভূতির প্রকাশ
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
            <p className="font-bengali text-muted-foreground">লোড হচ্ছে...</p>
          </div>
        ) : poems.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {poems.map((poem, index) => (
              <div 
                key={poem.id}
                className="literary-card hover:border-accent/30 animate-slide-up group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-xl font-semibold font-bengali-display text-foreground mb-2 group-hover:text-accent transition-colors">
                  {poem.title}
                </h3>
                <p className="text-sm text-muted-foreground font-bengali mb-3">
                  {new Date(poem.created_at).toLocaleDateString('bn-BD')}
                </p>
                <div className="prose-bengali">
                  <p className="text-foreground/80 leading-relaxed whitespace-pre-line">
                    {poem.body.substring(0, 200)}
                    {poem.body.length > 200 && '...'}
                  </p>
                </div>
                {poem.body.length > 200 && (
                  <button className="mt-4 text-accent hover:text-accent/80 font-bengali font-medium transition-colors hover:underline">
                    সম্পূর্ণ পড়ুন →
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="font-bengali text-muted-foreground text-lg">এখনো কোনো কবিতা যোগ করা হয়নি।</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Poetry;