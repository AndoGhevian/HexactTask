# Hexact Task

## Original Description
You give any **website** as an input, and the output must be all the **links** within that **website** with all their statuses, its mean that you must scan any **website** (no matter what kind of **website** it will be) and on the console display all the **URLs** of this site with status codes, and at the end display the total number of **URLs**  by status code.

P.S. scan the whole site, not just the home page

## Concepts
As I highlight above there are **3 task-specific and some addional concepts** to specify and keep in mind while designing, proving and implementing solution for the task
1. [**website**](#website)
1. [**webpage**](#webpage)
1. [**url**](#url)
1. [**link**](#link)
1. [**site**](#site)
1. [**registrable domain**](#registrable-domain)
1. [**public suffix**](#public-suffix)
1. [**top level domain**](#top-level-domain)
1. [**xhtml**](#xhtml)

#### website
String that identifies on the internet group of [webpages](#webpage) and shared
between them, i.e. domain, but in this case we will consider any [URL](#url)
that identifies [webpage](#webpage). This spesification is rephrased based on the task requirements.

For original website term definition see - [MDN Website Definition][mdn_website]

#### webpage
[MDN Webpage Definition][mdn_webpage]
> A web page is a simple document displayable by a browser. Such documents are written in the HTML language. A web page can embed a variety of different types of resources such as: style information, scripts, media.

> Note: Browsers can also display other documents such as PDF files or images, but the term web page specifically refers to HTML documents. Otherwise, we only use the term document.

Regarding the document type which represents a webpage, we will consider **HTML** as in this
MDN Learn page noted, and [XHTML](#xhtml) which is also parsable by **text/html Parsers**, although with some drawbacks.


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

#### xhtml
[W3C XHTML Definition][w3c_xhtml]
> XHTML is a family of current and future document types and modules that reproduce, subset, and extend HTML 4 [HTML4].

Well XHTML is, theoretically, **HTML4** expressed as **XML**. So we **can, and will** handle it with
**HTML Parser** in order not to miss any links that may be omited in case if it express invalid
**XML**, in which case will simply stop parsing and produce errors while handled by **XML Parser**

> W3C: It is intended to be used as a language for content that is both XML-conforming and, if some simple guidelines are followed, operates in HTML 4 conforming user agents.

This is noted in **spec**. But it's not true, in practice there is many disadvantages/drawbacks
of using **XHTML** with **HTML4 Complient Parsers**, even if you follow those guidlines. Those
drawbacks are linked at the bottom of [MDN XHTML Guide page][mdn_xhtml].

Starting from [HTML5][whatwg_html5] the term - **XHTML**, no longer used as noted in **spec**
> The XML syntax for HTML was formerly referred to as "XHTML", but this specification does not use that term (among other reasons, because no such term is used for the HTML syntaxes of MathML and SVG).
So when we

## Considerations
1.
    As forms designed for data submition to the server, and response may differ for
    different data submition, and even with method **GET** for different data sets it
    will end up with different [urls](#url), theres no any logic behinde of tracking this links.

    So we will consider only **a, area, and link elements**, and will perform simple
    **GET** requests and follow **redirections** for deep traverse of the page.
1.
    Since tha task definition confuses concepts of links and urls(See concepts above):
    > - You give any [website](#website) as an input, and the output must be all the [links](#link) within that **website** with all their statuses.
    > - display all the [URLs](#url) of this [site](#site) with status codes, and at the end display the total number of **URLs**  by status code.

    It leads to the idea that in case of redirects we need to consider **full redirection
    path** to the actual recourse, and not only the links.

1.
    In this case(See abolve), when considering all [urls](#url) reachable from the given entry point([website](#website)), this requirement of:
    > display all the **URLs** of this [site](#site) with status codes

    Is misleading. So do we need to traverse at least one level for
    external resporces(not same [site](#site)), to get their status codes, or we need only
    to traverse givent [site](#site) urls? Although it's a question, it can be toggled
    all with just one flag, so we skip this question.

    > NOTE: Same-Site is not the same as Same-Origin!!!
1. 
    I Also want to mention requirement regarding a **kind of a website**:
    > you must scan any **website** (no matter what kind of **website** it will be)

    Well, in my solution I omit handling of **scripts**, because in this case
    It will be necessary to provide a WHATWG [DOM][whatwg_dom] and [HTML][whatwg_html5] Standards, for use with Node.js or use some kind of browser automation tool, I think it will be overhealm for a script, with such a simple use cases, even if not in terms of resources used, but in terms of interface, and method of use.

    So it can be used with any website, but not in terms of execution of a scripts. So **SPA-s**
    may not be handled as expected, if they not leverage **Server-side rendering**.
1.
    Regarding the links, We will handle all the links as [hyperlinks](#link), not as **Links to external resources**, because as mentioned in **spec**, each of them has a specific algorithm of
    processing, and implementation of those are client specific task, and is very hard in my oppinion,
    It involves at least parsing of each obtained resource to produce external recource links from it,
    based on **mimtypes**.
    **e.g. css @import rules.**

Now, taking into account the aforesaid we will rephrase the task.

## Rephrased Task
Given a [url](#url) of a [webpage](#webpage), you need to deep traverse all endpoints([urls](#url)) of an application, reachable via [links](#link) - from it, or from subsequent linked [webpages](#webpage) which are the [same site](#site).

1. [URL](#url) called reachable via link if it directly indicates that [url](#url) as destination, or if that [url](#url) is encountered during **subsequent redirections path** arise during transition by the link.
1. [URL](#url) considered  to belong to the application if it belongs
to the [same site](#site) as the initial entry point([url](#url)) to the application.
1. Process must stop subsequent traversing for the [urls](#url) that are not
[same site](#site) as entry point [url](#url)

If provided webpage (i.e. initial [url](#url)) not belongs to a valid [site](#site),
or as exception for development, to localhost, process of traversing will fail on startup.

[mdn_url]: https://developer.mozilla.org/en-US/docs/Glossary/URL
[mdn_website]: https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Pages_sites_servers_and_search_engines#web_site
[mdn_xhtml]: https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/XHTML
[w3c_xhtml]: https://www.w3.org/TR/xhtml1/#xhtml
[mdn_webpage]: https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Pages_sites_servers_and_search_engines#web_page
[mdn_site]: https://developer.mozilla.org/en-US/docs/Glossary/Site
[mdn_tld]: https://developer.mozilla.org/en-US/docs/Glossary/TLD
[whatwg_dom]: https://dom.spec.whatwg.org/
[whatwg_registrable_domain]: https://url.spec.whatwg.org/#host-registrable-domain
[whatwg_html5]: https://html.spec.whatwg.org/
[whatwg_link]: https://html.spec.whatwg.org/multipage/links.html#links
[whatwg_public_suffix]: https://url.spec.whatwg.org/#host-public-suffix
[publicsuffix.org]: https://publicsuffix.org/
[icann_tld]: https://www.icann.org/resources/pages/tlds-2012-02-25-en
[MDN]: https://developer.mozilla.org/