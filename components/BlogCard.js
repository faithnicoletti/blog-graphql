import Link from 'next/link';
import Format from '../layout/format';

export default function BlogPost({
    title, 
    author,
    coverPhoto,
    excerpt,
    datePublished,
    slug
}) {
    return (
        <div className="border rounded-lg p-4 mb-4 hover:shadow-md transition duration-300">
            <div className="grid md:grid-cols-2">
                <div className="image">
                    <Link href={'/posts/' + slug}><img src={coverPhoto.url} alt="" width={400} height={400}/></Link>
                </div>
                <div className="info">
                    <div className="date">
                        <p href={'/posts/' + slug} className="text-orange-600">Published {datePublished}</p>
                    </div>
                    <div className="title">
                        <Link href={'/posts/' + slug} className="tex-2xl md:text-5xl font-bold text-gray-600 hover:text-gray-800">{title}</Link>
                    </div>
                    <div className="excerpt">
                        <p className="tex-2xl text-sm text-gray-400">{excerpt}</p>
                    </div>
                    <br />
                    <p className="text-gray-500 py-3">Author: {author.name} </p>
                </div>
            </div>
        </div>
    );
}
