# Hexact Task

## Original Description
You give any **website** as an input, and the output must be all the **links** within that **website** with all their statuses, its mean that you must scan any **website** (no matter what kind of **website** it will be) and on the console display all the **URLs** of this site with status codes, and at the end display the total number of **URLs**  by status code.

P.S. scan the whole site, not just the home page

## Concepts
As I highlight above there are **3 task-specific and some addional concepts** to specify and keep in mind while designing and implementing solution for the task
1. [**website**](#website)
1. [**url**](#url)
1. [**link**](#link)
1. [**site**](#site)
1. [**registrable domain**](#registrable-domain)

#### website
String that specifies web resource on the internet, i.e. [URL](#url)

#### url
[MDN url definition][mdn_url]
> Uniform Resource Locator (URL) is a text string that specifies where a resource (such as a web page, image, or video) can be found on the Internet.

#### link
[WHATWG link definition][whatwg_link]
> Links are a conceptual construct, created by **a, area, form, and link elements**, that represent a connection between two resources, one of which is the current Document. There are two kinds of links in HTML:

> **Links to external resources**

> These are links to resources that are to be used to augment the current document, generally automatically processed by the user agent. All external resource links have a fetch and process the linked resource algorithm which describes how the resource is obtained.

> **Hyperlinks**

>These are links to other resources that are generally exposed to the user by the user agent so that the user can cause the user agent to navigate to those resources, e.g. to visit them in a browser or download them.

#### site
[MDN site definition][mdn_site]
> The site of a piece of web content is determined by the [registrable domain](#registrable-domain) of the host within the origin. This is computed by consulting a Public Suffix List to find the portion of the host which is counted as the public suffix (e.g. com, org or co.uk).

#### registrable domain
[WHATWG registrable domain definition][whatwg_registrable_domain]
> A host’s registrable domain is a domain formed by the most specific public suffix, along with the domain label immediately preceding it, if any. To obtain host’s registrable domain, run these steps:

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
    In this case(See abolve), when considering all urls reachable from the given entry point, this requirement of:
    > display all the **URLs** of this site with status codes

    Is misleading. So do we need to traverse at least one level for
    external resporces, to get their status codes, or we need only
    to traverse givent [site](#site) urls? Although it's a question, it can be toggled
    all with just one flag, so we skip this question.


[mdn_url]: https://developer.mozilla.org/en-US/docs/Glossary/URL
[mdn_site]: https://developer.mozilla.org/en-US/docs/Glossary/Site
[whatwg_registrable_domain]: https://url.spec.whatwg.org/#host-registrable-domain
[whatwg_link]: https://html.spec.whatwg.org/multipage/links.html#links
[MDN]: https://developer.mozilla.org/