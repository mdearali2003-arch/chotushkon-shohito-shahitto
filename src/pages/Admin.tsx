import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Pencil, Trash2, Plus, LogOut, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Content {
  id: string;
  title: string;
  body: string;
  category: 'কবিতা' | 'গল্প' | 'প্রবন্ধ';
  created_at: string;
  updated_at: string;
}

const Admin = () => {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    category: '' as 'কবিতা' | 'গল্প' | 'প্রবন্ধ' | '',
  });
  const [error, setError] = useState('');
  
  const { signOut } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    try {
      const { data, error } = await supabase
        .from('contents')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContents(data || []);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.body || !formData.category) {
      setError('সব ক্ষেত্র পূরণ করুন');
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (editingId) {
        const { error } = await supabase
          .from('contents')
          .update({
            title: formData.title,
            body: formData.body,
            category: formData.category,
          })
          .eq('id', editingId);

        if (error) throw error;
        toast({ title: "সফলভাবে আপডেট হয়েছে" });
      } else {
        const { error } = await supabase
          .from('contents')
          .insert([{
            title: formData.title,
            body: formData.body,
            category: formData.category,
          }]);

        if (error) throw error;
        toast({ title: "নতুন কন্টেন্ট যোগ করা হয়েছে" });
      }

      setFormData({ title: '', body: '', category: '' });
      setEditingId(null);
      fetchContents();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (content: Content) => {
    setFormData({
      title: content.title,
      body: content.body,
      category: content.category,
    });
    setEditingId(content.id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('আপনি কি নিশ্চিত যে এটি মুছে ফেলতে চান?')) return;

    try {
      const { error } = await supabase
        .from('contents')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: "কন্টেন্ট মুছে ফেলা হয়েছে" });
      fetchContents();
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold font-bengali-display literary-gradient-text">
            অ্যাডমিন ড্যাশবোর্ড - চতুষ্কোণ
          </h1>
          <div className="flex gap-2">
            <Link to="/">
              <Button variant="outline" size="sm">
                <Home className="h-4 w-4 mr-2" />
                হোমে যান
              </Button>
            </Link>
            <Button onClick={handleSignOut} variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              লগআউট
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="font-bengali-display">
                  {editingId ? 'কন্টেন্ট সম্পাদনা করুন' : 'নতুন কন্টেন্ট যোগ করুন'}
                </CardTitle>
                <CardDescription className="font-bengali">
                  {editingId ? 'বিদ্যমান কন্টেন্ট আপডেট করুন' : 'নতুন কবিতা, গল্প বা প্রবন্ধ তৈরি করুন'}
                </CardDescription>
              </CardHeader>
              
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription className="font-bengali">{error}</AlertDescription>
                    </Alert>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="title" className="font-bengali">শিরোনাম</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="কন্টেন্টের শিরোনাম"
                      className="font-bengali"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category" className="font-bengali">বিভাগ</Label>
                    <Select value={formData.category} onValueChange={(value: 'কবিতা' | 'গল্প' | 'প্রবন্ধ') => setFormData({ ...formData, category: value })}>
                      <SelectTrigger className="font-bengali">
                        <SelectValue placeholder="বিভাগ নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="কবিতা" className="font-bengali">কবিতা</SelectItem>
                        <SelectItem value="গল্প" className="font-bengali">গল্প</SelectItem>
                        <SelectItem value="প্রবন্ধ" className="font-bengali">প্রবন্ধ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="body" className="font-bengali">বিষয়বস্তু</Label>
                    <Textarea
                      id="body"
                      value={formData.body}
                      onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                      placeholder="আপনার কন্টেন্ট লিখুন..."
                      className="font-bengali min-h-[200px]"
                      required
                    />
                  </div>
                </CardContent>
                
                <CardFooter className="flex gap-2">
                  <Button type="submit" disabled={loading} className="font-bengali">
                    {loading ? 'সংরক্ষণ হচ্ছে...' : (editingId ? 'আপডেট করুন' : 'যোগ করুন')}
                  </Button>
                  {editingId && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => {
                        setEditingId(null);
                        setFormData({ title: '', body: '', category: '' });
                      }}
                      className="font-bengali"
                    >
                      বাতিল
                    </Button>
                  )}
                </CardFooter>
              </form>
            </Card>
          </div>

          {/* Content List */}
          <div>
            <h2 className="text-xl font-semibold font-bengali-display mb-4">বিদ্যমান কন্টেন্ট</h2>
            <div className="space-y-4 max-h-[700px] overflow-y-auto">
              {contents.map((content) => (
                <Card key={content.id} className="relative">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg font-bengali-display">{content.title}</CardTitle>
                        <CardDescription className="font-bengali">
                          {content.category} • {new Date(content.created_at).toLocaleDateString('bn-BD')}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(content)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(content.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground font-bengali line-clamp-3">
                      {content.body.substring(0, 150)}...
                    </p>
                  </CardContent>
                </Card>
              ))}
              
              {contents.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground font-bengali">কোন কন্টেন্ট পাওয়া যায়নি</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;