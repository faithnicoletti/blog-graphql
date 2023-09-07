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
        <div className="bg-gray-100 border rounded-lg p-4 mb-4 hover:shadow-xl transition duration-300 bg-white">
            <div className="grid md:grid-cols-2">
                <div className="image">
                    <Link href={'/posts/' + slug}><img src={coverPhoto.url} alt="" width={400} height={400}/></Link>
                </div>
                <div className="info">
                    <div className="date">
                        <p href={'/posts/' + slug} className="text-orange-800">Published {datePublished}</p>
                    </div>
                    <div className="title">
                        <Link href={'/posts/' + slug} className="text-2xl md:text-5xl font-bold text-gray-600 hover:text-gray-800 pt-50">{title}</Link>
                    </div>
                    <br />
                    <div className="excerpt">
                        <p className="tex-2xl text-sm text-gray-400">{excerpt}</p>
                    </div>

                    <p className="text-orange-800 py-3"><span className="text-orange-800">By</span> {author.name} </p>
                </div>
            </div>
        </div>
    );
}
