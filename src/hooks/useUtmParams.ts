import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;
const STORAGE_KEY = 'source_mkt_utms';

export type UtmParams = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
};

export function useUtmParams(): UtmParams {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const found: UtmParams = {};
    let hasUtm = false;

    for (const key of UTM_KEYS) {
      const val = params.get(key);
      if (val) {
        found[key] = val;
        hasUtm = true;
      }
    }

    if (hasUtm) {
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found));
      } catch {
        // sessionStorage não disponível (modo privado restrito)
      }
    }
  }, [location.search]);

  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}
