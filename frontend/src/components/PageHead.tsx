import Head from 'next/head';
import { getGlobalConfig } from 'modules/utils/api.config';
import { getDefaultLanguage, getHeaderConfig } from 'modules/header/utills';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';

interface Props {
  title?: string;
  description?: string;
  sharingImageUrl?: string;
}

export const PageHead = ({ title, description, sharingImageUrl }: Props) => {
  const { baseUrl, applicationName } = getGlobalConfig();
  const router = useRouter();
  const currentLanguage = router.locale ?? getDefaultLanguage();
  const intl = useIntl();
  const titleWithSiteName =
    title !== undefined
      ? title.includes(intl.formatMessage({ id: 'home.title' }))
        ? title
        : `${title} - ${intl.formatMessage({ id: 'home.title' })}`
      : intl.formatMessage({ id: 'home.title' });

  const canonicalURL = `${baseUrl}${
    currentLanguage !== getDefaultLanguage() ? `/${currentLanguage}` : ''
  }${router.asPath}`;

  const getOthersLinks = () => {
    const supportedLanguages = getHeaderConfig()?.menu?.supportedLanguages || [];

    return supportedLanguages.map(oneLocale => {
      const href = `${baseUrl}${oneLocale !== getDefaultLanguage() ? `/${oneLocale}` : ''}${
        router.asPath
      }`;

      return <link key={href} rel="alternate" hrefLang={oneLocale} href={href} />;
    });
  };

  return (
    <Head>
      <title>{titleWithSiteName}</title>
      {description !== undefined && <meta name="description" content={description} />}
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />

      <link rel="canonical" href={canonicalURL} />

      <meta property="og:title" content={titleWithSiteName} />
      {description !== undefined && <meta name="og:description" content={description} />}
      <meta property="og:site_name" content={applicationName} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalURL} />
      <meta property="og:locale" content={`${currentLanguage}_${currentLanguage.toUpperCase()}`} />
      <meta property="og:image" content={sharingImageUrl ?? '/medias/favicon.png'} />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:url" content={canonicalURL} />
      <meta name="twitter:title" content={titleWithSiteName} />
      {description !== undefined && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={sharingImageUrl ?? '/medias/favicon.png'} />

      {/*getOthersLinks()*/}
    </Head>
  );
};
