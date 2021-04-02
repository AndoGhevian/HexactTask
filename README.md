# Hexact Task

## Original Description
You give any **website** as an input, and the output must be all the **links** within that **website** with all their statuses, its mean that you must scan any **website** (no matter what kind of **website** it will be) and on the console display all the **URLs** of this site with status codes, and at the end display the total number of **URLs**  by status code.

P.S. scan the whole site, not just the home page

## Concepts
As I highlight above there are **3 task-specific and some addional concepts** to specify and keep in mind while designing and implementing solution for the task
1. [**website**](#website)
1. [**webpage**](#webpage)
1. [**url**](#url)
1. [**link**](#link)
1. [**site**](#site)
1. [**registrable domain**](#registrable-domain)
1. [**public suffix**](#public-suffix)
1. [**top level domain**](#top-level-domain)

#### website
String that identifies on the internet group of [webpages](#webpage) and shared
between them, i.e. domain, but in this case we will consider any [URL](#url)
that identifies [webpage](#webpage). This spesification is rephrased based on the task requirements.

For original website term definition see - [MDN Website Definition][mdn_website]

#### webpage
[MDN Webpage Definition][mdn_webpage]
> A web page is a simple document displayable by a browser. Such documents are written in the HTML language. A web page can embed a variety of different types of resources such as: style information, scripts, media.

> Note: Browsers can also display other documents such as PDF files or images, but the term web page specifically refers to HTML documents. Otherwise, we only use the term document.

We will use this note as a basis for further reasoning

#### url
[MDN Url Definition][mdn_url]
> Uniform Resource Locator (URL) is a text string that specifies where a resource (such as a web page, image, or video) can be found on the Internet.

#### link
[WHATWG Link Definition][whatwg_link]
> Links are a conceptual construct, created by **a, area, form, and link elements**, that represent a connection between two resources, one of which is the current Document. There are two kinds of links in HTML:

> **Links to external resources**

> These are links to resources that are to be used to augment the current document, generally automatically processed by the user agent. All external resource links have a fetch and process the linked resource algorithm which describes how the resource is obtained.

> **Hyperlinks**

>These are links to other resources that are generally exposed to the user by the user agent so that the user can cause the user agent to navigate to those resources, e.g. to visit them in a browser or download them.

#### site
[MDN Site Definition][mdn_site]
> The site of a piece of web content is determined by the [registrable domain](#registrable-domain) of the host within the origin. This is computed by consulting a Public Suffix List to find the portion of the host which is counted as the public suffix (e.g. com, org or co.uk).

#### registrable domain
[WHATWG Registrable Domain Definition][whatwg_registrable_domain]
> A host’s registrable domain is a domain formed by the most specific [public suffix](#public-suffix), along with the domain label immediately preceding it, if any. To obtain host’s registrable domain, run these steps:

#### public suffix
[WHATWG Public Suffix definition][whatwg_public_suffix]
> A host’s public suffix is the portion of a host which is included on the Public Suffix List.

See List under the [publicsuffix.org][publicsuffix.org]

#### top level domain
[MDN Top Level Domain Definition][mdn_tld]
> A TLD (top-level domain) is the most generic domain in the Internet's hierarchical DNS (domain name system). A TLD is the final component of a domain name, for example, "org" in developer.mozilla.org.

See [ICANN Top-Level Domains][icann_tld]

## Considerations
1.
    As forms designed for data submition to the server, and response may differ for
    different data submition, and even with method **GET** for different data sets it
    will end up with different [urls](#url), theres no any logic behinde of tracking this links.

    So we will consider only **a, area, and link elements**, and will perform simple
    **GET** requests for deep traverse of the page.
1.
    Since tha task definition confuses concepts of links and urls:
    > - You give any **website** as an input, and the output must be all the **links** within that **website** with all their statuses.
    > - display all the **URLs** of this site with status codes, and at the end display the total number of **URLs**  by status code.

    It leads to the idea that in case of redirects we need to consider **full redirection
    path** to the actual recourse, and not only the links.

1.
    In this case(See abolve), when considering all [urls](#url) reachable from the given entry point([website](#website)), this requirement of:
    > display all the **URLs** of this site with status codes

    Is misleading. So do we need to traverse at least one level for
    external resporces, to get their status codes, or we need only
    to traverse givent [site](#site) urls? Although it's a question, it can be toggled
    all with just one flag, so we skip this question.

Now, taking into account the aforesaid we will rephrase the task.

## Rephrased Task
Given a [url](#url) of a static [webpage](#webpage), you need to deep traverse all endpoints([urls](#url)) of an application, reachable via [links](#link) from it or from subsequent linked [webpages](#webpage) which are the [same site](#site), including
all [urls](#url) in the middle of redirection paths, in case if they occure, i.e.
not only [urls](#url) that are directly reachable by [links](#link). 

1. [URL](#url) considered  to belong to the application if it belongs
to the [same site](#site) as the initial entry point([url](#url)) to the application.
1. Process must stop subsequent traversing for the [urls](#url) that are not
[same site](#site) as entry point [url](#url)

If provided webpage (i.e. initial [url](#url)) not belongs to a valid [site](#site),
or as exception for development, to localhost, process of traversing will fail on startup.

[mdn_url]: https://developer.mozilla.org/en-US/docs/Glossary/URL
[mdn_website]: https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Pages_sites_servers_and_search_engines#web_site
[mdn_webpage]: https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Pages_sites_servers_and_search_engines#web_page
[mdn_site]: https://developer.mozilla.org/en-US/docs/Glossary/Site
[mdn_tld]: https://developer.mozilla.org/en-US/docs/Glossary/TLD
[whatwg_registrable_domain]: https://url.spec.whatwg.org/#host-registrable-domain
[whatwg_link]: https://html.spec.whatwg.org/multipage/links.html#links
[whatwg_public_suffix]: https://url.spec.whatwg.org/#host-public-suffix
[publicsuffix.org]: https://publicsuffix.org/
[icann_tld]: https://www.icann.org/resources/pages/tlds-2012-02-25-en
[MDN]: https://developer.mozilla.org/