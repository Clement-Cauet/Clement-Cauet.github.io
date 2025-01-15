require 'json'
require 'net/http'
require 'uri'

module Jekyll
    class LoadResumeJson < Generator
        safe true

        def generate(site)
            gist_url = 'https://gist.githubusercontent.com/Clement-Cauet/f842b0450dec8ce789854e5279b401dd/raw'
            uri = URI.parse(gist_url)
            response = Net::HTTP.get_response(uri)

            if response.is_a?(Net::HTTPSuccess)
                site.data['resume'] = JSON.parse(response.body)
            else
                Jekyll.logger.warn "Failed to fetch resume JSON from Gist:", gist_url
            end
        end
    end
end