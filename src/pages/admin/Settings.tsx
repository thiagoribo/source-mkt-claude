import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface SiteSettings {
  contact_email: string;
  contact_phone: string;
  contact_whatsapp: string;
  address: string;
  social_instagram: string;
  social_linkedin: string;
  social_facebook: string;
  footer_text: string;
}

const defaultSettings: SiteSettings = {
  contact_email: 'contato@sourcemkt.com.br',
  contact_phone: '(11) 93729-2921',
  contact_whatsapp: '5511937292921',
  address: 'São Paulo, SP',
  social_instagram: 'https://instagram.com/sourcemkt',
  social_linkedin: 'https://linkedin.com/company/sourcemkt',
  social_facebook: '',
  footer_text: '© 2024 SM Agency. Todos os direitos reservados.',
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const queryClient = useQueryClient();
  const isConfigured = isSupabaseConfigured();

  const { data: savedSettings, isLoading } = useQuery({
    queryKey: ['site-settings'],
    queryFn: async () => {
      if (!isConfigured) return null;

      const { data, error } = await supabase
        .from('site_settings')
        .select('*');

      if (error) throw error;

      // Convert array to object
      const settingsObj: Record<string, string> = {};
      data?.forEach((item) => {
        if (typeof item.value === 'string') {
          settingsObj[item.key] = item.value;
        } else if (item.value && typeof item.value === 'object') {
          settingsObj[item.key] = JSON.stringify(item.value);
        }
      });

      return settingsObj;
    },
    enabled: isConfigured,
  });

  useEffect(() => {
    if (savedSettings) {
      setSettings((prev) => ({
        ...prev,
        ...savedSettings,
      }));
    }
  }, [savedSettings]);

  const saveMutation = useMutation({
    mutationFn: async (newSettings: SiteSettings) => {
      if (!isConfigured) throw new Error('Supabase not configured');

      // Upsert each setting
      const entries = Object.entries(newSettings);
      for (const [key, value] of entries) {
        const { error } = await supabase
          .from('site_settings')
          .upsert(
            { key, value: JSON.stringify(value), updated_at: new Date().toISOString() },
            { onConflict: 'key' }
          );

        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-settings'] });
      toast.success('Configurações salvas com sucesso');
    },
    onError: () => {
      toast.error('Erro ao salvar configurações');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate(settings);
  };

  if (!isConfigured) {
    return (
      <div>
        <h1 className="text-3xl font-bold font-serif mb-8">Configurações</h1>
        <div className="bg-accent/10 border-2 border-accent/30 p-6">
          <p className="text-foreground/70">
            Configure o Supabase para gerenciar as configurações do site.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-serif mb-2">Configurações</h1>
          <p className="text-foreground/60">Informações de contato e redes sociais</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Contact Info */}
          <div className="bg-background border-2 border-border p-6">
            <h2 className="font-bold font-serif text-xl mb-6">Informações de Contato</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="contact_email">Email</Label>
                <Input
                  id="contact_email"
                  type="email"
                  value={settings.contact_email}
                  onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact_phone">Telefone</Label>
                <Input
                  id="contact_phone"
                  value={settings.contact_phone}
                  onChange={(e) => setSettings({ ...settings, contact_phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact_whatsapp">WhatsApp (apenas números)</Label>
                <Input
                  id="contact_whatsapp"
                  value={settings.contact_whatsapp}
                  onChange={(e) => setSettings({ ...settings, contact_whatsapp: e.target.value })}
                  placeholder="5511999999999"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Input
                  id="address"
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-background border-2 border-border p-6">
            <h2 className="font-bold font-serif text-xl mb-6">Redes Sociais</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="social_instagram">Instagram (URL)</Label>
                <Input
                  id="social_instagram"
                  value={settings.social_instagram}
                  onChange={(e) => setSettings({ ...settings, social_instagram: e.target.value })}
                  placeholder="https://instagram.com/..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="social_linkedin">LinkedIn (URL)</Label>
                <Input
                  id="social_linkedin"
                  value={settings.social_linkedin}
                  onChange={(e) => setSettings({ ...settings, social_linkedin: e.target.value })}
                  placeholder="https://linkedin.com/company/..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="social_facebook">Facebook (URL)</Label>
                <Input
                  id="social_facebook"
                  value={settings.social_facebook}
                  onChange={(e) => setSettings({ ...settings, social_facebook: e.target.value })}
                  placeholder="https://facebook.com/..."
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-background border-2 border-border p-6">
            <h2 className="font-bold font-serif text-xl mb-6">Rodapé</h2>
            <div className="space-y-2">
              <Label htmlFor="footer_text">Texto do rodapé</Label>
              <Textarea
                id="footer_text"
                value={settings.footer_text}
                onChange={(e) => setSettings({ ...settings, footer_text: e.target.value })}
                rows={2}
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button type="submit" disabled={saveMutation.isPending} className="gap-2">
              <Save className="w-4 h-4" />
              {saveMutation.isPending ? 'Salvando...' : 'Salvar Configurações'}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
